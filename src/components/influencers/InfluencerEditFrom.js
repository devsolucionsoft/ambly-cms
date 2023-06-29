import React, { useState, useEffect } from "react";
import styles from "../styles/Form.module.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import GButton from "../buttons/GButton";
import Swal from "sweetalert2";
// Api
import { InfluencersApi } from "../../api/InfluencersApi";

const input_required = "Este campo es requerido";

const formSchema = Yup.object().shape({
  name_influencer: Yup.string().required(input_required),
  email: Yup.string().email("Email invalido").required(input_required),
  // password: Yup.string().min(6, "Debe contener mas de  caracteres"),
  code_influencer: Yup.string().required(input_required),
  porcentaje_influencer: Yup.number().required(input_required),
});

const InfluencerEditForm = (props) => {
  const { isEditing, info, getInfluencer, closeModal } = props;
  const [loader, setLoader] = useState(false);

  const InfluencersApiModel = new InfluencersApi();
  const [formvalues, setFromValues] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await InfluencersApiModel.GetInfluencer(isEditing);
      console.log(response.data.data);
      if (response.status === 200) {
        setFromValues(response.data.data);
      }
    })();
  }, [isEditing]);

  console.log(formvalues);

  return (
    <div className={styles.FormContainer}>
      <h1>Editar Perfil</h1>
      {formvalues && (
        <Formik
          initialValues={{
            name_influencer: formvalues.name_influencer,
            code_influencer: formvalues.code_influencer,
            porcentaje_influencer: formvalues.porcentaje_influencer,
            email: formvalues.email,
          }}
          validationSchema={formSchema}
          onSubmit={async (values) => {
            if (!loader) {
              setLoader(true);
              const response = await InfluencersApiModel.EditeInfluencer(values, isEditing);

              switch (response.status) {
                case 201:
                  getInfluencer();
                  Swal.fire({
                    title: "Influencer editado",
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
                  <Field className="fieldShadow" name="name_influencer" placeholder="Nombre" />
                  {errors.name_influencer && touched.name_influencer ? (
                    <div className={styles.labelError}>{errors.name_influencer}</div>
                  ) : null}
                </div>

                <div className={styles.fieldContain}>
                  <span>Porcentaje</span>
                  <Field
                    className="fieldShadow"
                    name="porcentaje_influencer"
                    type="number"
                    placeholder="Porcentaje"
                  />
                  {errors.porcentaje_influencer && touched.porcentaje_influencer ? (
                    <div className={styles.labelError}>{errors.porcentaje_influencer}</div>
                  ) : null}
                </div>

                <div className={styles.fieldContain}>
                  <span>Código</span>
                  <Field className="fieldShadow" name="code_influencer" placeholder="Código" />
                  {errors.code_influencer && touched.code_influencer ? (
                    <div className={styles.labelError}>{errors.code_influencer}</div>
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

export default InfluencerEditForm;
