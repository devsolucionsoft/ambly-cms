import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./CoursesForms.module.scss";
import GButton from "../buttons/GButton";
// Api
import { CoursesApi } from "../../api/CoursesApi";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const ModuleForm = ({ modalOpen, closeModal, openModal, infoModule, course }) => {
  const newCourseSchema = Yup.object().shape({
    name_module: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    time_module: Yup.string().required("Required"),
  });
  const router = useRouter();

  const CoursesApiModel = new CoursesApi();

  return (
    <div className={`${styles.moduleFormContainer} ${styles.formContainer}`}>
      <h1>Editar modulo</h1>

      <Formik
        initialValues={{
          name_module: infoModule.name_module,
          description: infoModule.description,
          time_module: infoModule.time_module,
        }}
        validationSchema={newCourseSchema}
        onSubmit={async (values) => {
          // same shape as initial values
          const response = await CoursesApiModel.EditeModule(values, infoModule.id);

          switch (response.status) {
            case 201:
              Swal.fire({
                title: "Modulo editado",
                icon: "success",
              }).then(() => {
                router.push(`/modulos?id=${course}`);
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

          setShowModuleForm(true);
        }}
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form>
            <div className={styles.moduleForm}>
              <div>
                <Field
                  className={`fieldShadow ${styles.field}`}
                  name="name_module"
                  placeholder="Nombre del modulo"
                />
                {errors.name_module && touched.name_module ? (
                  <div className="fieldErrors">{errors.name_module}</div>
                ) : null}
              </div>

              <div>
                <Field
                  className={`fieldShadow ${styles.field}`}
                  name="time_module"
                  placeholder="Duracion del modulo"
                />
                {errors.time_module && touched.time_module ? (
                  <div className={"fieldErrors"}>{errors.time_module}</div>
                ) : null}
              </div>

              <div className={styles.moduleDescription}>
                <Field
                  className={`fieldShadow ${styles.field}`}
                  name="description"
                  placeholder="Descripcion"
                  as="textarea"
                />
                {errors.description && touched.description ? (
                  <div className={"fieldErrors"}>{errors.description}</div>
                ) : null}
              </div>

              <div className={`fieldShadow ${styles.field} ${styles.videoInput}`}>
                <span>Videos del modulo </span>
                <div
                  className={styles.addVideoBtn}
                  onClick={() => (modalOpen ? closeModal() : openModal())}
                >
                  Editar o agregar videos
                </div>
              </div>
            </div>

            <GButton text={"Aceptar"}> Abrir</GButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ModuleForm;
