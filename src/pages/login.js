import { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import backgroundLogin from "../images/background-login.jpg";
import iconAmbly from "../../public/static/images/icon-ambly.png";
import Image from "next/image";
// API
import { AuthApi } from "../api/AutApi";

const Login = () => {
  const AuthApiModel = new AuthApi();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values) => {
      const response = await AuthApiModel.UserLogin(values);

      switch (response.status) {
        case 200:
          localStorage.setItem(
            "token_session",
            JSON.stringify({
              id: response.data.id,
              email: values.email,
              token: response.data.token,
            })
          );
          Router.push("/").catch(console.error);
          break;
        case 403:
          Swal.fire({
            title: `Este email está asociado a una cuenta de ${response.data?.message}`,
            text: `Inicia sesión con ${response.data?.message}`,
            icon: "error",
          });
          break;
        default:
          Swal.fire({
            title: "No pudimos iniciar sesíon",
            text: "Revisa tu email o tu contraseña",
            icon: "error",
          });
          break;
      }
    },
  });

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("token_session"));

    if (session?.token) {
      Router.push("/").catch(console.error);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Login | Ambly CMS</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <div style={{ position: "absolute", height: "100%", width: "100%", overflow: "hidden" }}>
          <Image
            src={backgroundLogin}
            layout="fill"
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
          />
        </div>
        <Container
          maxWidth="sm"
          style={{
            position: "relative",
            zIndex: 2,
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{ my: 3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <Image
                src={iconAmbly}
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
              />
            </Box>

            <Box
              sx={{
                my: 3,
                py: 3,
                px: 4,
                borderRadius: 2,
                backgroundColor: "rgba(255, 255, 255, .9)",
              }}
            >
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="standard"
                color="primary"
              />
              <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Contraseña"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="standard"
                color="primary"
              />
              <Box sx={{ py: 2 }}>
                <Button
                  color="error"
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Iniciar sesión
                </Button>
              </Box>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;
