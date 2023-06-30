import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./VideoForm.module.scss";
import GButton from "../buttons/GButton";
import Swal from "sweetalert2";
// Api
import { SettingApi } from "../../api/SettingApi";
import { CoursesApi } from "../../api/CoursesApi";

const SUPPORTED_FORMATS = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "file/pdf",
  "file/txt",
  "file/.xlsx",
  "file/docx",
  "file/pdf",
  "application/pdf",
];

const videoSchema = Yup.object().shape({
  name: Yup.string().required("Nombre del Archivo "),
  file: Yup.mixed()
    .required("El archivo es requerido")
    .test(
      "fileFormat",
      "Formato no soportado",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

const FileForm = ({ idModule, getCourses, closeModal }) => {
  const [loader, setLoader] = useState(false);

  const SettingApiModel = new SettingApi();
  const CoursesApiModel = new CoursesApi();

  return (
    <div className={styles.videoFormContainer}>
      <div>
        <h1>Nuevo Archivo</h1>
        <Formik
          initialValues={{
            name: "",
            file: "",
          }}
          validationSchema={videoSchema}
          onSubmit={async (values) => {
            if (!loader) {
              setLoader(true);
              const responseFile = await CoursesApiModel.UploadFile(values.file);

              if (responseFile.status === 201) {
                const response = await CoursesApiModel.AddFile(
                  {
                    ...values,
                    file: responseFile.data.pdfUrl,
                  },
                  idModule
                );

                switch (response.status) {
                  case 201:
                    getCourses();
                    Swal.fire({
                      title: "Archivo creado",
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
                    placeholder="Nombre del archivo"
                  />
                  {errors.name && touched.name ? (
                    <div className="fieldErrors">{errors.name}</div>
                  ) : null}
                </div>

                <div className={`fieldShadow ${styles.field} ${styles.videoInput}`}>
                  <span>Archivo</span>
                  <input
                    className="uploadButton"
                    id="modules"
                    name="file"
                    type="file"
                    accept = "application/pdf"
                    onChange={(event) => {
                      setFieldValue("file", event.currentTarget.files[0]);
                    }}
                  />
                  {errors.file && touched.file ? (
                    <div className="fieldErrors">{errors.file}</div>
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

export default FileForm;
