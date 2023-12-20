import React, { useState } from "react";
import styles from "../styles/Form.module.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import GButton from "../buttons/GButton";
import Swal from "sweetalert2";
import InfoIcon from "@mui/icons-material/Info";
// Api
import { InfluencersApi } from "../../api/InfluencersApi";

const input_required = "Este campo es requerido";

const formSchema = Yup.object().shape({
  name_influencer: Yup.string().required(input_required),
  email: Yup.string().email("Email invalido").required(input_required),
  password: Yup.string().required(input_required).min(6, "Debe contener mas de  caracteres"),
  code_influencer: Yup.string().required(input_required),
  porcentaje_ganancia: Yup.number().required(input_required),
  porcentaje_descuento: Yup.number().required(input_required),
});

const InfluencerForm = (props) => {
  const { getInfo, closeModal } = props;
  const InfluencersApiModel = new InfluencersApi();
  const [loader, setLoader] = useState(false);

  return (
    <div className={styles.FormContainer}>
      <h1>Nuevo Influencer</h1>
      <Formik
        initialValues={{
          name_influencer: "",
          email: "",
          password: "",
          code_influencer: "",
          porcentaje_ganancia: "",
          porcentaje_descuento: "",
        }}
        validationSchema={formSchema}
        onSubmit={async (values) => {
          if (!loader) {
            setLoader(true);
            const response = await InfluencersApiModel.CreateInfluencer(values);
            switch (response.status) {
              case 201:
                getInfo();
                Swal.fire({
                  title: "Influencer creado",
                  icon: "success",
                }).then(() => {
                  closeModal();
                });
                break;
              default:
                const textSwal = response.data.message;
                Swal.fire({
                  title: "Ha ocurrido un error",
                  text: textSwal,
                  icon: "error",
                });
                break;
            }
          }
          setLoader(false);
        }}
      >
        {({ errors, touched }) => (
          <Form className={styles.form}>
            <div className={styles.column}>
              <div className={styles.fieldContain}>
                <span>Nombre</span>
                <Field className="fieldShadow" name="name_influencer" placeholder="Nombre" />
                {errors.name_influencer && touched.name_influencer ? (
                  <div className={styles.labelError}>{errors.name_influencer}</div>
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
                <span title="Porcentaje de ganancia por valor del curso" style={{alignItems : 'center', display : 'flex', gap : 5}}>
                  Porcentaje de ganancia <InfoIcon fontSize="10" />
                </span>
                <Field
                  className="fieldShadow"
                  name="porcentaje_ganancia"
                  type="number"
                  placeholder="Porcentaje de ganancia"
                />
                {errors.porcentaje_ganancia && touched.porcentaje_ganancia ? (
                  <div className={styles.labelError}>{errors.porcentaje_ganancia}</div>
                ) : null}
              </div>
              <div className={styles.fieldContain}>
                <span title="Porcentaje de descuento del código" style={{alignItems : 'center', display : 'flex', gap : 5}}>
                  Porcentaje de descuento <InfoIcon fontSize="10" />
                </span>
                <Field
                  className="fieldShadow"
                  name="porcentaje_descuento"
                  type="number"
                  placeholder="Porcentaje de descuento"
                />
                {errors.porcentaje_descuento && touched.porcentaje_descuento ? (
                  <div className={styles.labelError}>{errors.porcentaje_descuento}</div>
                ) : null}
              </div>

              <div className={styles.fieldContain}>
                <span>Código</span>
                <Field className="fieldShadow" name="code_influencer" placeholder="Código" />
                {errors.code_influencer && touched.code_influencer ? (
                  <div className={styles.labelError}>{errors.code_influencer}</div>
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

export default InfluencerForm;
