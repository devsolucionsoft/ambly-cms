import React from "react";
import styles from "../styles/Form.module.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import GButton from "../buttons/GButton";
// Api
import { InstructorsApi } from "../../api/InstructorsApi";
import { SettingApi } from "../../api/SettingApi";
import Swal from "sweetalert2";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const InstrcutorSchema = Yup.object().shape({
  name_instructor: Yup.string().required("El nombre es requerido"),
  description_instructor: Yup.string().required("La descripcion es requerida"),
  description_secondary: Yup.string().required("la descripcion secundaria es requerida"),
  description_tertiary: Yup.string().required("la descripcion secundaria es requerida"),
  image_instructor: Yup.mixed()
    .required("La imagen del instructor es requerida")
    .test(
      "fileFormat",
      "Formato no soportado, suba unicamente .png .jpeg, o jpg",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  image_secondary: Yup.mixed()
    .required("La imagen secundaria es requerida")
    .test(
      "fileFormat",
      "Formato no soportado, suba unicamente .png .jpeg, o jpg",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

const InstructorForm = (props) => {
  const InstructorsApiModel = new InstructorsApi();
  const SettingApiModel = new SettingApi();

  const { handleClose, getInstructors } = props;

  return (
    <div className={styles.FormContainer}>
      <h1>Nuevo Instructor</h1>
      <Formik
        initialValues={{
          name_instructor: "",
          description_instructor: "",
          description_secondary: "",
          image_instructor: "",
          image_secondary: "",
          description_tertiary: "",
        }}
        validationSchema={InstrcutorSchema}
        onSubmit={async (values) => {
          const response1 = await SettingApiModel.uploadImage(values.image_instructor);
          const response2 = await SettingApiModel.uploadImage(values.image_secondary);

          if (response1.status === 201 && response2.status === 201) {
            const response = await InstructorsApiModel.CreateInstructor({
              ...values,
              image_instructor: response1.data.imageUrl,
              image_secondary: response2.data.imageUrl,
            });

            switch (response.status) {
              case 201:
                getInstructors();
                Swal.fire({
                  title: "Intructor creado",
                  icon: "success",
                }).then(() => {
                  handleClose();
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
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className={styles.form}>
            <div className={styles.column}>
              <div className={styles.fieldContain}>
                <span>Nombre instructor</span>
                <Field
                  className="fieldShadow"
                  name="name_instructor"
                  placeholder="Nombre del instrcutor"
                />
                {errors.name_instructor && touched.name_instructor ? (
                  <div className={styles.labelError}>{errors.name_instructor}</div>
                ) : null}
              </div>

              <div className={styles.fieldContain}>
                <span>Imagen instructor</span>
                <input
                  className={`uploadButton ${styles.fieldUpload}`}
                  id="image_instructor"
                  name="image_instructor"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("image_instructor", event.currentTarget.files[0]);
                  }}
                />
                {errors.image_instructor && touched.image_instructor ? (
                  <div className={styles.labelError}>{errors.image_instructor}</div>
                ) : null}
              </div>

              <div className={styles.fieldContain}>
                <span>Imagen secundaria instructor</span>
                <input
                  className={`uploadButton ${styles.fieldUpload}`}
                  id="image_secondary"
                  name="image_secondary"
                  type="file"
                  onChange={(event) => {
                    setFieldValue("image_secondary", event.currentTarget.files[0]);
                  }}
                />
                {errors.image_secondary && touched.image_secondary ? (
                  <div className={styles.labelError}>{errors.image_secondary}</div>
                ) : null}
              </div>
              <div className={styles.fieldContain}>
                <span>Descripcion</span>
                <Field
                  className={`fieldShadow ${styles.fieldDescription}`}
                  name="description_instructor"
                  placeholder="Descripcion"
                  as="textarea"
                />
                {errors.description_instructor && touched.description_instructor ? (
                  <div className={styles.labelError}>{errors.description_instructor}</div>
                ) : null}
              </div>
            </div>

            <div className={styles.column}>
              <div className={styles.fieldContain}>
                <span>Descripcion secundaria</span>
                <Field
                  className={`fieldShadow ${styles.fieldDescription}`}
                  name="description_secondary"
                  placeholder="Descripcion secundaria"
                  as="textarea"
                />
                {errors.description_secondary && touched.description_secondary ? (
                  <div className={styles.labelError}>{errors.description_secondary}</div>
                ) : null}
              </div>
              <div className={styles.fieldContain}>
                <span>Descripcion terciaria</span>
                <Field
                  className={`fieldShadow ${styles.fieldDescription}`}
                  name="description_tertiary"
                  placeholder="Descripcion terciaria"
                  as="textarea"
                />
                {errors.description_tertiary && touched.description_tertiary ? (
                  <div className={styles.labelError}>{errors.description_tertiary}</div>
                ) : null}
              </div>

              <GButton type="submit" text={"Agregar"}>
                Submit
              </GButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InstructorForm;
