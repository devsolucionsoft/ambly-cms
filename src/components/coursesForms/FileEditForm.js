import React, { useState, useEffect } from "react";
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
  "application/pdf",
];

const videoSchema = Yup.object().shape({
  name: Yup.string().required("Nombre del video "),

  file: Yup.mixed().test("fileFormat", "Formato no soportado", (value) =>
    value ? SUPPORTED_FORMATS.includes(value.type) : true
  ),
});

const FileEditForm = ({ filesItems, idFile, getCourses, closeModal }) => {
  const [formvalues, setFromValues] = useState(false);
  const [loader, setLoader] = useState(false);

  const SettingApiModel = new SettingApi();
  const CoursesApiModel = new CoursesApi();

  useEffect(() => {
    setFromValues(filesItems.find((item) => item.id === idFile));
  }, [idFile]);

  return (
    <div className={styles.videoFormContainer}>
      <div>
        <h1>Editar Archivo</h1>
        {formvalues && (
          <Formik
            initialValues={{
              name: formvalues.name_file,
              file: false,
            }}
            validationSchema={videoSchema}
            onSubmit={async (values) => {
              if (!loader) {
                setLoader(true);
                const data = {
                  name_file: values.name,
                  link_file: formvalues.link_file,
                };

                if (values.file) {
                  const responseVideo = await CoursesApiModel.UploadFile(values.file);
                  data = {
                    ...data,
                    link_file: responseVideo.data.pdfUrl,
                  };
                }

                const response = await CoursesApiModel.EditeFile(data, idFile);

                switch (response.status) {
                  case 201:
                    getCourses();
                    Swal.fire({
                      title: "Archivo editado",
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
        )}
      </div>
    </div>
  );
};

export default FileEditForm;
