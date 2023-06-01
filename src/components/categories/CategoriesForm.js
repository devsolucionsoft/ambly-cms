import React from "react";
import styles from "./CategoriesForm.module.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import GButton from "../buttons/GButton";
import Swal from "sweetalert2";
// Api
import { CategoriesApi } from "../../api/CategoriesApi";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const CategorySchema = Yup.object().shape({
  name: Yup.string().required("Nombre de la categoria requerido"),
  description: Yup.string().required("Descripcion de la categoria requerida"),
  image: Yup.mixed()
    .required("La imagen es requerida")
    .test(
      "fileFormat",
      "Formato no soportado, suba unicamente: .png .jpeg, o jpg",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
  image_banner: Yup.mixed()
    .required("La imagen es requerida")
    .test(
      "fileFormat",
      "Formato no soportado, suba unicamente: .png .jpeg, o jpg",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

const CategoriesForm = (props) => {
  const CategoriesApiModel = new CategoriesApi();
  const { closeModal, getCategories } = props;

  return (
    <div className={styles.categoryFormContainer}>
      <div>
        <h1>Nueva Categoria</h1>
        <Formik
          initialValues={{
            name: "",
            description: "",
            image: "",
            image_banner: "",
          }}
          validationSchema={CategorySchema}
          onSubmit={async (values) => {
            // same shape as initial values
            const responseImage = await CategoriesApiModel.uploadImage(values.image);
            const responseImage2 = await CategoriesApiModel.uploadImage(values.image_banner);

            if (responseImage.status === 201 && responseImage2.status === 201) {
              const response = await CategoriesApiModel.CreateCategorie({
                ...values,
                image: responseImage.data.imageUrl,
                image_banner: responseImage2.data.imageUrl,
              });

              switch (response.status) {
                case 201:
                  getCategories();
                  Swal.fire({
                    title: "Categoria creada",
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
                  <span>Imagen de la categoria</span>
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

                <div className={`${`fieldShadow ${styles.field}`} ${styles.imgInput}`}>
                  <span>Imagen del banner</span>
                  <input
                    className="uploadButton"
                    id="image_banner"
                    name="image_banner"
                    type="file"
                    onChange={(event) => {
                      setFieldValue("image_banner", event.currentTarget.files[0]);
                    }}
                  />
                  {errors.image_banner && touched.image_banner ? (
                    <div className="fieldErrors">{errors.image_banner}</div>
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
      </div>
    </div>
  );
};

export default CategoriesForm;
