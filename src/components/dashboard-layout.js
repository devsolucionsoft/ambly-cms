import { useState, useEffect, Fragment } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { AuthGuard } from "./auth-guard";
import { DashboardNavbar } from "./dashboard-navbar";
import { DashboardSidebar } from "./dashboard-sidebar";
import Router, { useRouter } from "next/router";
import { AuthApi } from "../api/AutApi";
const DashboardLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  paddingTop: 0,
  [theme.breakpoints.up("lg")]: {
    paddingLeft: 280,
  },
}));

export const DashboardLayout = (props) => {
  const router = useRouter();
  const { children } = props;
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [validate, setValidate] = useState(false);
  const AuthApiModel = new AuthApi();
  useEffect(() => {
    (async () => {
      const session = JSON.parse(localStorage.getItem("token_session"));
      if (session?.token) {
        const response = await AuthApiModel.RefreshToken(session?.token);
        localStorage.setItem(
          "token_session",
          JSON.stringify({ ...session, token: response.data.token })
        );
      }
    })();
  }, []);

  useEffect(() => {
    setValidate(false);

    const session = JSON.parse(localStorage.getItem("token_session"));

    if (!session?.token) {
      Router.push("/login").catch(console.error);
    } else {
      if (session.role === "influencer") {
        if (router.pathname !== "/influencer") {
          Router.push(`/influencer/?id=${session.id}`).catch(console.error);
        }
      }

      if (session.role === "agency") {
        const agency_id = localStorage.getItem("agency_id");
        if (router.pathname !== "/detalle-de-agencia" && router.pathname !== "/influencer") {
          Router.push(`/detalle-de-agencia/?id=${agency_id}`).catch(console.error);
        }
      }

      if (session.role === "ambly") {
        if (router.pathname !== "/agencias") {
          Router.push(`/agencias`).catch(console.error);
        }
      }

      if (session.role === "admin") {
        if (
          router.pathname === "/agencias" ||
          router.pathname === "/detalle-de-agencia" ||
          router.pathname === "/influencer"
        ) {
          Router.push(`/`).catch(console.error);
        }
      }
    }
    setTimeout(() => {
      setValidate(true);
    }, 200);
  }, [router.pathname]);

  return (
    <AuthGuard>
      {validate && (
        <Fragment>
          <DashboardLayoutRoot>
            <Box
              sx={{
                display: "flex",
                flex: "1 1 auto",
                flexDirection: "column",
                width: "100%",
              }}
            >
              {children}
            </Box>
          </DashboardLayoutRoot>
          {/* <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} /> */}
          <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
        </Fragment>
      )}
    </AuthGuard>
  );
};
