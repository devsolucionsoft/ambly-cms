import { useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { Box, Divider, Drawer, useMediaQuery } from "@mui/material";
import { ChartBar as ChartBarIcon } from "../icons/chart-bar";
import SchoolIcon from "@mui/icons-material/School";
import StoreIcon from "@mui/icons-material/Store";
import CategoryIcon from "@mui/icons-material/Category";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Users as UsersIcon } from "../icons/users";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { Logo } from "./logo";
import { NavItem } from "./nav-item";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
import Router from "next/router";

const handleSignOut = () => {
  localStorage.clear("token_session");
  Router.push("/login").catch(console.error);
  return;
};
const items = [
  {
    href: "/",
    icon: <ChartBarIcon fontSize="small" />,
    title: "Dashboard",
    role: "admin",
  },
  {
    href: "/instructores",
    icon: <UsersIcon fontSize="small" />,
    title: "Instructores",
    role: "admin",
  },
  {
    href: "/categorias",
    icon: <CategoryIcon fontSize="small" />,
    title: "Categorias",
    role: "admin",
  },
  {
    href: "/cursos",
    icon: <SchoolIcon fontSize="small" />,
    title: "Cursos",
    role: "admin",
  },
  {
    href: "/splash",
    icon: <AddToHomeScreenIcon fontSize="small" />,
    title: "Splash",
    role: "admin",
  },
  {
    href: "/trailers",
    icon: <OndemandVideoIcon fontSize="small" />,
    title: "Trailers",
    role: "admin",
  },
  {
    href: "/agencias",
    icon: <StoreIcon fontSize="small" />,
    title: "Agencias",
    role: "ambly",
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (open) {
      onClose?.();
    }
  }, [router.asPath]);

  const session = JSON.parse(localStorage.getItem("token_session"));

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#181812",
            my: 3,
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items
            .filter((item) => session.role == item.role)
            .map((item) => (
              <NavItem icon={item.icon} href={item.href} title={item.title} />
            ))}

          <div onClick={handleSignOut}>
            <NavItem
              key={"closeSesion"}
              icon={<ExitToAppIcon fontSize="small" />}
              href={"/login"}
              title={"Cerrar sesion"}
            />
          </div>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "#222222",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
