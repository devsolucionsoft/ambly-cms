import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./VideoForm.module.scss";
import GButton from "../buttons/GButton";
import Swal from "sweetalert2";
// Api
import { SettingApi } from "../../api/SettingApi";
import { CoursesApi } from "../../api/CoursesApi";

const SUPPORTED_FORMATS = ["video/mp4"];

const videoSchema = Yup.object().shape({
  name: Yup.string().required("Nombre del video "),
  description: Yup.string().required("Descripcion del video requerida"),
  video: Yup.mixed()
    .required("El video es requerido")
    .test(
      "fileFormat",
      "Formato no soportado, suba unicamente: .mp4",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

const VideoForm = ({ idModule, getCourses, closeModal }) => {
  const [loader, setLoader] = useState(false);

  const SettingApiModel = new SettingApi();
  const CoursesApiModel = new CoursesApi();

  return (
    <div className={styles.videoFormContainer}>
      <div>
        <h1>Nuevo Video</h1>
        <Formik
          initialValues={{
            name: "",
            description: "",
            video: "",
          }}
          validationSchema={videoSchema}
          onSubmit={async (values) => {
            if (!loader) {
              setLoader(true);
              const responseVideo = await SettingApiModel.uploadImage(values.video);

              if (responseVideo.status === 201) {
                const response = await CoursesApiModel.AddVideo(
                  {
                    ...values,
                    video: responseVideo.data.imageUrl,
                  },
                  idModule
                );

                switch (response.status) {
                  case 201:
                    getCourses();
                    Swal.fire({
                      title: "Video creado",
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
              } else {
                Swal.fire({
                  title: "Ha ocurrido un error",
                  text: "Intentalo mas tarde",
                  icon: "error",
                });
              }
              setLoader(false);
            }
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <div className={styles.form}>
                <div>
                  <Field
                    className={`fieldShadow ${styles.field}`}
                    name="name"
                    placeholder="Nombre del video"
                  />
                  {errors.name && touched.name ? (
                    <div className="fieldErrors">{errors.name}</div>
                  ) : null}
                </div>

                <div className={`fieldShadow ${styles.field} ${styles.videoInput}`}>
                  <span>Video</span>
                  <input
                    className="uploadButton"
                    id="modules"
                    name="video"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("video", event.currentTarget.files[0]);
                    }}
                  />
                  {errors.video && touched.video ? (
                    <div className="fieldErrors">{errors.video}</div>
                  ) : null}
                </div>

                <div className={styles.description1}>
                  <Field
                    className={` fieldShadow ${styles.field} `}
                    name="description"
                    placeholder="Descripcion"
                    as="textarea"
                  />
                  {errors.description && touched.description ? (
                    <div className="fieldErrors">{errors.description}</div>
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
    </div>
  );
};

export default VideoForm;
