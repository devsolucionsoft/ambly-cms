import React, { useState, useEffect } from "react";
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
  video: Yup.mixed().test("fileFormat", "Formato no soportado, suba unicamente: .mp4", (value) =>
    value ? SUPPORTED_FORMATS.includes(value.type) : true
  ),
});

const VideoForm = ({ videosItems, idVideo, getCourses, closeModal }) => {
  const [formvalues, setFromValues] = useState(false);
  const [loader, setLoader] = useState(false);

  const SettingApiModel = new SettingApi();
  const CoursesApiModel = new CoursesApi();

  useEffect(() => {
    setFromValues(videosItems.find((item) => item.id === idVideo));
  }, [idVideo]);

  return (
    <div className={styles.videoFormContainer}>
      <div>
        <h1>Editar Video</h1>
        {formvalues && (
          <Formik
            initialValues={{
              name: formvalues.name_video,
              description: formvalues.description_video,
              video: false,
            }}
            validationSchema={videoSchema}
            onSubmit={async (values) => {
              if (!loader) {
                setLoader(true);
                let data = {
                  name_video: values.name,
                  description_video: values.description,
                };

                if (values.video) {
                  const responseVideo = await SettingApiModel.uploadImage(values.video);
                  data = {
                    ...data,
                    video: responseVideo.data.imageUrl,
                  };
                }

                const response = await CoursesApiModel.EditeVideo(data, idVideo);
                console.log(response);

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

                  <GButton type="submit" text={loader ? "cargando..." : "Guardar"}>
                    Submit
                  </GButton>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default VideoForm;
