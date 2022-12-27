import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
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
          Router.push("/").catch(console.error)
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
    const session = JSON.parse(localStorage.getItem("token_session"))

    if(session?.token) {
      Router.push("/").catch(console.error)
    }
  }, []);

  return (
    <>
      <Head>
        <title>Login | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
        style={{}}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{ my: 3 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <Typography
                color="textPrimary"
                variant="h3"
                align="center"
                style={{ marginBottom: "20px" }}
              >
                Inicia sesión Ambly
              </Typography>
            </Box>
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
              variant="outlined"
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
              variant="outlined"
              color="info"
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Iniciar sesión
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Login;