import React, { useState, useEffect } from "react";
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
  image_instructor: Yup.mixed().test(
    "fileFormat",
    "Formato no soportado, suba unicamente .png .jpeg, o jpg",
    (value) => (value ? SUPPORTED_FORMATS.includes(value.type) : true)
  ),
  image_secondary: Yup.mixed().test(
    "fileFormat",
    "Formato no soportado, suba unicamente .png .jpeg, o jpg",
    (value) => (value ? SUPPORTED_FORMATS.includes(value.type) : true)
  ),
});

const InstructorEditForm = (props) => {
  const { itemsInstructors, isEditing, handleClose, getInstructors } = props;

  const InstructorsApiModel = new InstructorsApi();
  const SettingApiModel = new SettingApi();

  const [formvalues, setFromValues] = useState(false);

  useEffect(() => {
    setFromValues(itemsInstructors.find((item) => item.id === isEditing));
  }, [isEditing]);

  return (
    <div className={styles.FormContainer}>
      <h1>Editar Instructor</h1>
      {formvalues && (
        <Formik
          initialValues={{
            name_instructor: formvalues.name_instructor,
            description_instructor: formvalues.description_instructor,
            description_secondary: formvalues.description_secondary,
            description_tertiary: formvalues.description_third,
            image_instructor: undefined,
            image_secondary: undefined,
          }}
          validationSchema={InstrcutorSchema}
          onSubmit={async (values) => {
            let data = {
              name_instructor: values.name_instructor,
              description_instructor: values.description_instructor,
              description_secondary: values.description_secondary,
              description_third: values.description_tertiary,
            };

            if (values.image_instructor) {
              const response1 = await SettingApiModel.uploadImage(values.image_instructor);
              if (response1.status === 201) {
                data = { ...data, image_instructor: response1.data.imageUrl };
              }
            }
            if (values.image_instructor) {
              const response2 = await SettingApiModel.uploadImage(values.image_secondary);
              if (response2.status === 201) {
                data = { ...data, image_secondary: response2.data.imageUrl };
              }
            }

            const response = await InstructorsApiModel.EditInstructor(data, isEditing);

            switch (response.status) {
              case 201:
                getInstructors();
                Swal.fire({
                  title: "Intructor editado",
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
                    <div className="fieldErrors fieldErrorsFix">{errors.image_instructor}</div>
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
                    <div className="fieldErrors fieldErrorsFix">{errors.image_secondary}</div>
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

                <GButton type="submit" text={"Aceptar"}>
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

export default InstructorEditForm;
