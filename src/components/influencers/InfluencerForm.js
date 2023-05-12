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
  course_name: Yup.string().required("Nombre del curso requerido"),
  instructor: Yup.string().required("Instructor requerida"),
  video: Yup.mixed()
    .required("La video es requerido")
    .test(
      "fileFormat",
      "Formato no soportado, suba unicamente: .mp4 .x-m4v, o jpg",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

const InfluencerForm = (props) => {
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
      <h1>Nuevo Influencer</h1>
      <Formik
        initialValues={{
          course_name: "",
          instructor: "",
          video: "",
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
                    course_name: "Trailer creado",
                    icon: "success",
                  }).then(() => {
                    closeModal();
                  });
                  break;
                default:
                  Swal.fire({
                    course_name: "Ha ocurrido un error",
                    text: "Intentalo mas tarde",
                    icon: "error",
                  });
                  break;
              }
            } else {
              Swal.fire({
                course_name: "Ha ocurrido un error",
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
                <span>Nombre de la influencer</span>
                <Field className="fieldShadow" name="course_name" placeholder="Nombre influencer" />
                {errors.course_name && touched.course_name ? (
                  <div className={styles.labelError}>{errors.course_name}</div>
                ) : null}
              </div>

              <div className={styles.fieldContain}>
                <span>Telefono</span>
                <Field
                  className="fieldShadow"
                  name="course_name"
                  placeholder="Telefono influencer"
                />
                {errors.course_name && touched.course_name ? (
                  <div className={styles.labelError}>{errors.course_name}</div>
                ) : null}
              </div>

              <div className={styles.fieldContain}>
                <span>Descripción de la influencer</span>
                <Field
                  className={`fieldShadow ${styles.fieldDescription}`}
                  name="description"
                  as="textarea"
                  placeholder="Descripcion influencer"
                />
                {errors.description && touched.description ? (
                  <div className={styles.labelError}>{errors.description}</div>
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
