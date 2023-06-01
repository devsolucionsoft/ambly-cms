import React, { useState, useEffect } from "react";
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
  password: Yup.string().min(6, "Debe contener mas de  caracteres"),
  porcentaje_agency: Yup.number().required(input_required),
});

const AgenciaEditForm = (props) => {
  const AgenciaApiModel = new AgenciaApi();

  const { isEditing, items, getAgencias, closeModal } = props;
  const [loader, setLoader] = useState(false);

  //const AgenciasApiModel = new AgenciasApi();
  const [formvalues, setFromValues] = useState(false);

  useEffect(() => {
    setFromValues(items.find((item) => item.id === isEditing));
  }, [isEditing]);

  return (
    <div className={styles.FormContainer}>
      <h1>Editar Agencia</h1>
      {formvalues && (
        <Formik
          initialValues={{
            name_agency: formvalues.name_agency,
            email: formvalues.email,
            password: "",
            porcentaje_agency: formvalues.porcentaje_agency,
          }}
          validationSchema={formSchema}
          onSubmit={async (values) => {
            if (!loader) {
              setLoader(true);

              const response = await AgenciaApiModel.EditeAgencia(values, isEditing);

              switch (response.status) {
                case 201:
                  getAgencias();
                  Swal.fire({
                    title: "Agencia editada",
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
          {({ errors, touched, setFieldValue }) => (
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

                {/* <div className={styles.fieldContain}>
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
                </div> */}

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

                <GButton type="submit" text={loader ? "cargando..." : "Aceptar"}>
                  Submit
                </GButton>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default AgenciaEditForm;
