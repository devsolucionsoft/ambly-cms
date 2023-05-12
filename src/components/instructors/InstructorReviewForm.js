import React, { useState, useEffect } from "react";
import styles from "../styles/Form.module.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import GButton from "../buttons/GButton";
// Api
import { InstructorsApi } from "../../api/InstructorsApi";
import Swal from "sweetalert2";

const ReviewSchema = Yup.object().shape({
  review: Yup.string().required("La review es requerida"),
  author: Yup.string().required("El nombre del autor es requerido"),
});

const InstrcutorReviewForm = (props) => {
  const { isAddReview, itemsInstructors, getInstructors } = props;
  const InstructorsApiModel = new InstructorsApi();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(itemsInstructors.find((item) => item.id === isAddReview).reviews);
  }, [isAddReview, itemsInstructors]);

  const removeTask = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡Una vez eliminado, no podrá recuperar esta review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        handleDelete(id);
      }
    });
  };

  // DELETE ITEM
  const handleDelete = async (id) => {
    const response = await InstructorsApiModel.deleteReviewInstructor(id);
    switch (response.status) {
      case 201:
        getInstructors();
        Swal.fire("¡Eliminado!", "Su review ha sido eliminada.", "success");
        break;
      default:
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un problema, intentalo mas tarde",
        });
        break;
    }
  };

  return (
    <div className={styles.FormContainer}>
      <div>
        <h1>Reviews</h1>
        <div className={styles.form}>
          <div className={styles.column}>
            {reviews.map((item) => (
              <div
                style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
                key={item.id}
              >
                <div style={{ paddingRight: "5px" }}>
                  <p style={{ fontSize: "14px", fontWeight: "bold" }}>El espectador</p>
                  <p style={{ fontSize: "12px" }}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.{" "}
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 ${styles.trashIcon}`}
                  onClick={() => removeTask(item.id)}
                  height={"30px"}
                  style={{ cursor: "pointer" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            ))}
          </div>

          <div className={styles.column}>
            <Formik
              initialValues={{
                review: "",
                author: "",
              }}
              validationSchema={ReviewSchema}
              onSubmit={async (values) => {
                // same shape as initial values
                const response = await InstructorsApiModel.AddReviewsInstructor(
                  values,
                  isAddReview
                );
                switch (response.status) {
                  case 201:
                    getInstructors();
                    Swal.fire({
                      title: "Review agregada",
                      icon: "success",
                    }).then(() => {
                      //handleClose();
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
                      <span>Autor</span>
                      <input
                        className={`uploadButton ${styles.fieldUpload}`}
                        name="author"
                        placeholder="Autor"
                      />
                      {errors.author && touched.author ? (
                        <div className={styles.labelError}>{errors.author}</div>
                      ) : null}
                    </div>

                    <div className={styles.fieldContain}>
                      <span>Review</span>
                      <Field
                        className={`fieldShadow ${styles.fieldDescription}`}
                        name="review"
                        placeholder="Review"
                        as="textarea"
                      />
                      {errors.review && touched.review ? (
                        <div className={styles.labelError}>{errors.review}</div>
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
      </div>
    </div>
  );
};

export default InstrcutorReviewForm;
