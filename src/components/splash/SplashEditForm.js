import React, { useState, useEffect } from "react";
import styles from "./splashForm.module.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import GButton from "../buttons/GButton";
import Swal from "sweetalert2";
// Api
import { SettingApi } from "../../api/SettingApi";
import { SplashApi } from "../../api/SplashApi";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const SplashSchema = Yup.object().shape({
  name: Yup.string().required("Nombre del splash requerido"),
  description: Yup.string().required("Descripcion requerida"),
  image: Yup.mixed().test(
    "fileFormat",
    "Formato no soportado, suba unicamente: .png .jpeg, o jpg",
    (value) => (value ? SUPPORTED_FORMATS.includes(value.type) : true)
  ),
});

const SplashEditForm = (props) => {
  const { isEditing, itemsSplash, getSplash, closeModal } = props;

  const SettingApiModel = new SettingApi();
  const SplashApiModel = new SplashApi();

  const [formvalues, setFromValues] = useState(false);

  console.log(formvalues);

  useEffect(() => {
    setFromValues(itemsSplash.find((item) => item.id === isEditing));
  }, [isEditing]);

  return (
    <div className={styles.splashFormContainer}>
      <div>
        <h1>Editar Splash</h1>
        {formvalues && (
          <Formik
            initialValues={{
              name: formvalues.title,
              description: formvalues.description,
              image: false,
            }}
            validationSchema={SplashSchema}
            onSubmit={async (values) => {
              let data = {
                title: values.name,
                description: values.description,
              };

              if (values.image) {
                const responseImg = await SettingApiModel.uploadImage(values.image_instructor);
                if (responseImg.status === 201) {
                  data = { ...data, image: responseImg.data.imageUrl };
                }
              }

              const response = await SplashApiModel.EditeSplash(data, isEditing);

              console.log(response);

              switch (response.status) {
                case 201:
                  getSplash();
                  Swal.fire({
                    title: "Splash editado",
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
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <div className={styles.form}>
                  <div>
                    <Field
                      className={`fieldShadow ${styles.field}`}
                      name="name"
                      placeholder="Nombre del splash"
                    />
                    {errors.name && touched.name ? (
                      <div className="fieldErrors">{errors.name}</div>
                    ) : null}
                  </div>

                  <div className={`${`fieldShadow ${styles.field}`} ${styles.imgInput}`}>
                    <span>Imagen del del splash</span>
                    <input
                      className="uploadButton"
                      id="image"
                      name="image"
                      type="file"
                      onChange={(event) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                    />
                    {errors.image && touched.image ? (
                      <div className="fieldErrors">{errors.image}</div>
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

                  <GButton type="submit" text={"Agregar"}>
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

export default SplashEditForm;
