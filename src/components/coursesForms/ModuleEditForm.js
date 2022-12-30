import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./CoursesForms.module.scss";
import GButton from "../buttons/GButton";
// Api
import { CoursesApi } from "../../api/CoursesApi";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const ModuleForm = ({
  modalOpen,
  closeModal,
  openModal,
  infoModule,
  course,
  editing,
  stopEditing,
  getCourses,
  enableAddVideo,
  disableAddVideo,
  enableEditingFile,
  disableEditingFile,
}) => {
  const newCourseSchema = Yup.object().shape({
    name_module: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    time_module: Yup.string().required("Required"),
  });
  const router = useRouter();

  const CoursesApiModel = new CoursesApi();

  const removeTask = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡Una vez eliminado, no podrá recuperar este video!",
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
    const response = await CoursesApiModel.deleteVideo(id);
    switch (response.status) {
      case 201:
        getCourses();
        Swal.fire("¡Eliminado!", "Su video ha sido eliminado.", "success");
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

  const removeTaskFile = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡Una vez eliminado, no podrá recuperar este archivo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        handleDeleteFile(id);
      }
    });
  };

  // DELETE ITEM
  const handleDeleteFile = async (id) => {
    const response = await CoursesApiModel.deleteFile(id);
    switch (response.status) {
      case 201:
        getCourses();
        Swal.fire("¡Eliminado!", "Su archivo ha sido eliminado.", "success");
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

  // Componente para  listar Videos
  const VideoComponent = ({ titulo, idVideo }) => {
    return (
      <>
        <div className={styles.videoComponentContainer}>
          <h4>{titulo}</h4>

          <div>
            <svg
              onClick={() => (
                modalOpen ? closeModal() : openModal(), editing(idVideo), enableAddVideo()
              )}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => removeTask(idVideo)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        </div>
      </>
    );
  };

  // Componente para listar Descargables
  const FileComponent = ({ titulo, idFile }) => {
    return (
      <>
        <div className={styles.videoComponentContainer}>
          <h4>{titulo}</h4>

          <div>
            <svg
              onClick={() => (
                modalOpen ? closeModal() : openModal(), enableEditingFile(idFile), disableAddVideo()
              )}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              onClick={() => removeTaskFile(idFile)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </div>
        </div>
      </>
    );
  };

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
                <label>Nombre del modulo</label>
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
                <label>Duracion del modulo</label>
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
                <label>Descripcion</label>
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

              {/* Videos */}

              <div className={`fieldShadow ${styles.field} ${styles.videoInput}`}>
                <div className={styles.videoListHeader}>
                  <span>Videos del modulo </span>
                  <div
                    className={styles.addVideoBtn}
                    onClick={() => (
                      modalOpen ? closeModal() : openModal(), stopEditing(), enableAddVideo()
                    )}
                  >
                    Agregar Video
                  </div>
                </div>

                <div className={styles.videoList}>
                  {infoModule.videos.map((item) => (
                    <VideoComponent titulo={item.name_video} idVideo={item.id} key={item.id} />
                  ))}
                </div>
              </div>

              {/* Descargables */}
              <div className={`fieldShadow ${styles.field} ${styles.fileInput}`}>
                <div className={styles.videoListHeader}>
                  <span>Archivos del modulo </span>
                  <div
                    className={styles.addVideoBtn}
                    onClick={() => (
                      modalOpen ? closeModal() : openModal(),
                      stopEditing(),
                      disableAddVideo(),
                      disableEditingFile()
                    )}
                  >
                    Agregar Archivos
                  </div>
                </div>

                <div className={styles.videoList}>
                  {infoModule.file.map((item) => (
                    <FileComponent titulo={item.name_file} idFile={item.id} />
                  ))}
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
