import React, { useState } from "react";
import styles from "../styles/Form.module.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import GButton from "../buttons/GButton";
import Swal from "sweetalert2";
// Api
import { AgenciaApi } from "../../api/AgenciasApi";

const input_required = "Este campo es requerido";

const formSchema = Yup.object().shape({
  name_agency: Yup.string().required(input_required),
  email: Yup.string().email("Email invalido").required(input_required),
  password: Yup.string().required(input_required).min(6, "Debe contener mas de  caracteres"),
  porcentaje_agency: Yup.number().required(input_required),
});

const AgenciaForm = (props) => {
  const AgenciaApiModel = new AgenciaApi();

  const { getAgencias, closeModal } = props;

  const [loader, setLoader] = useState(false);

  return (
    <div className={styles.FormContainer}>
      <h1>Nueva Agencia</h1>
      <Formik
        initialValues={{
          name_agency: "",
          email: "",
          password: "",
          porcentaje_agency: "",
        }}
        validationSchema={formSchema}
        onSubmit={async (values) => {
          if (!loader) {
            setLoader(true);
            const response = await AgenciaApiModel.CreateAgencia(values);

            switch (response.status) {
              case 201:
                getAgencias();
                Swal.fire({
                  title: "Agencia creada",
                  icon: "success",
                }).then(() => {
                  closeModal();
                });
                break;
              default:
                Swal.fire({
                  title: "Ha ocurrido un error",
                  text: "Intentalo mas tarde",
                  icon: "error",
                });
                break;
            }

            setLoader(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <div className={styles.column}>
              <div className={styles.fieldContain}>
                <span>Nombre</span>
                <Field className="fieldShadow" name="name_agency" placeholder="Nombre" />
                {errors.name_agency && touched.name_agency ? (
                  <div className={styles.labelError}>{errors.name_agency}</div>
                ) : null}
              </div>

              <div className={styles.fieldContain}>
                <span>Email</span>
                <Field className="fieldShadow" name="email" type="mail" placeholder="Email" />
                {errors.email && touched.email ? (
                  <div className={styles.labelError}>{errors.email}</div>
                ) : null}
              </div>

              <div className={styles.fieldContain}>
                <span>Contraseña</span>
                <Field
                  className="fieldShadow"
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                />
                {errors.password && touched.password ? (
                  <div className={styles.labelError}>{errors.password}</div>
                ) : null}
              </div>

              <div className={styles.fieldContain}>
                <span>Porcentaje</span>
                <Field
                  className="fieldShadow"
                  name="porcentaje_agency"
                  type="number"
                  placeholder="Porcentaje"
                />
                {errors.porcentaje_agency && touched.porcentaje_agency ? (
                  <div className={styles.labelError}>{errors.porcentaje_agency}</div>
                ) : null}
              </div>
              <GButton type="submit" text={loader ? "cargando..." : "Agregar"}>
                Submit
              </GButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AgenciaForm;
