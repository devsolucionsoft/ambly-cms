import React, { useState, useEffect } from "react";
import styles from "./CategoriesForm.module.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import GButton from "../buttons/GButton";
import Swal from "sweetalert2";
// Api
import { CategoriesApi } from "../../api/CategoriesApi";
import { SettingApi } from "../../api/SettingApi";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const CategorySchema = Yup.object().shape({
  name: Yup.string().required("Nombre de la categoria requerido"),
  description: Yup.string().required("Descripcion de la categoria requerida"),
  image: Yup.mixed().test(
    "fileFormat",
    "Formato no soportado, suba unicamente: .png .jpeg, o jpg",
    (value) => (value ? SUPPORTED_FORMATS.includes(value.type) : true)
  ),
});

const CategoriesEditForm = (props) => {
  const CategoriesApiModel = new CategoriesApi();
  const SettingApiModel = new SettingApi();

  const { closeModal, getCategories, isEditing, itemsCategories } = props;
  const [formvalues, setFromValues] = useState(false);

  useEffect(() => {
    setFromValues(itemsCategories.find((item) => item.id === isEditing));
  }, [isEditing]);

  return (
    <div className={styles.categoryFormContainer}>
      <div>
        <h1>Editar Categoria</h1>
        {formvalues && (
          <Formik
            initialValues={{
              name: formvalues.name,
              description: formvalues.description,
              image: false,
            }}
            validationSchema={CategorySchema}
            onSubmit={async (values) => {
              let data = {
                name: values.name,
                description: values.description,
              };

              if (values.image) {
                const responseImg = await SettingApiModel.uploadImage(values.image);

                if (responseImg.status === 201) {
                  data = { ...data, image: responseImg.data.imageUrl };
                }
              }

              const response = await CategoriesApiModel.EditeCategorie(data, isEditing);

              switch (response.status) {
                case 201:
                  getCategories();
                  Swal.fire({
                    title: "Categoría editada",
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
                      placeholder="Nombre de la categoria"
                    />
                    {errors.name && touched.name ? (
                      <div className="fieldErrors">{errors.name}</div>
                    ) : null}
                  </div>

                  <div className={`${`fieldShadow ${styles.field}`} ${styles.imgInput}`}>
                    <span>Imagen del de la categoria</span>
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

export default CategoriesEditForm;
