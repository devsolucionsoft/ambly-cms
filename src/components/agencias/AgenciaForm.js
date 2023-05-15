import React, { useState, useEffect } from "react";
import styles from "../styles/Form.module.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import GButton from "../buttons/GButton";
import Swal from "sweetalert2";
// Api
import { SettingApi } from "../../api/SettingApi";
import { TrailersApi } from "../../api/TrailersApi";
import { InstructorsApi } from "../../api/InstructorsApi";
import { margin } from "@mui/system";

const SUPPORTED_FORMATS = ["video/mp4", "video/x-m4v"];

const TrailersSchema = Yup.object().shape({
  agency_name: Yup.string().required("Nombre del curso requerido"),
});

const AgenciaForm = (props) => {
  const { getTrailers, closeModal } = props;
  const SettingApiModel = new SettingApi();
  const TrailersApiModel = new TrailersApi();
  const [loader, setLoader] = useState(false);

  const InstructorsApiModel = new InstructorsApi();

  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await InstructorsApiModel.GetInstructors();
      response.status === 200 && setInstructors(response.data);
    })();
  }, []);

  return (
    <div className={styles.FormContainer}>
      <h1>Nueva Agencia</h1>
      <Formik
        initialValues={{
          agency_name: "",
        }}
        validationSchema={TrailersSchema}
        onSubmit={async (values) => {
          if (!loader) {
            setLoader(true);
            const responseImage = await SettingApiModel.uploadImage(values.video);

            if (responseImage.status === 201) {
              const response = await TrailersApiModel.CreateTrailers({
                ...values,
                video: responseImage.data.imageUrl,
              });

              switch (response.status) {
                case 201:
                  getTrailers();
                  Swal.fire({
                    agency_name: "Agencia creado",
                    icon: "success",
                  }).then(() => {
                    closeModal();
                  });
                  break;
                default:
                  Swal.fire({
                    agency_name: "Ha ocurrido un error",
                    text: "Intentalo mas tarde",
                    icon: "error",
                  });
                  break;
              }
            } else {
              Swal.fire({
                agency_name: "Ha ocurrido un error",
                text: "Intentalo mas tarde",
                icon: "error",
              });
            }
            setLoader(false);
          }
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className={styles.form}>
            <div className={styles.column}>
              <div className={styles.fieldContain}>
                <span>Nombre de la agencia</span>
                <Field
                  className="fieldShadow"
                  name="agency_name"
                  placeholder="Nombre de la agencia"
                />
                {errors.agency_name && touched.agency_name ? (
                  <div className={styles.labelError}>{errors.agency_name}</div>
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
