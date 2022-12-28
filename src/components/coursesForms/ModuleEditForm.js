import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './CoursesForms.module.scss'
import GButton from '../buttons/GButton';



const ModuleForm = ({ modalOpen, closeModal, openModal }) => {


  const newCourseSchema = Yup.object().shape({
    name_module: Yup.string()
      .required('Required'),
    description: Yup.string()
      .required('Required'),
    time_module: Yup.string()
      .required('Required')

  });

  const prueba = () => {
    return (

      <div>

        <Formik
          initialValues={{
            name_module: '',
            description: '',
            time_module: '',


          }}
          validationSchema={newCourseSchema}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
            setShowModuleForm(true)

          }}
        >
          {({ errors, touched, isSubmitting, setFieldValue }) => (
            <Form>

              <div className={styles.moduleForm} >

                <Field className={`fieldShadow ${styles.field}`} name="name_module" placeholder="Nombre del modulo" />
                {errors.name_module && touched.name_module ? (
                  <div>{errors.name_module}</div>
                ) : null}



                <Field className={`fieldShadow ${styles.field}`} name="time_module" placeholder="Duracion del modulo" />
                {errors.time_module && touched.time_module ? (
                  <div>{errors.time_module}</div>
                ) : null}

                <Field className={`${`fieldShadow ${styles.field}`} ${styles.moduleDescription}`} name="description" placeholder="Descripcion" as="textarea" />
                {errors.description && touched.description ? (
                  <div>{errors.description}</div>
                ) : null}

                <div className={`${`fieldShadow ${styles.field}`} ${styles.videoInput}`} >

                  <span>video del modulo</span>

                  <button onClick={modalVideo}>Agregar...</button>

                  {/* <input id="image_course" name="image_course" type="file" onChange={(event) => {
                  setFieldValue("file", event.currentTarget.files[0]);
                }} /> */}

                </div>

              </div>

            </Form>
          )}
        </Formik>

      </div>
    )
  }


  return (
    <div className={`${styles.moduleFormContainer} ${styles.formContainer}`}>
      <h1>Editar modulo</h1>

      <Formik
        initialValues={{
          name_module: '',
          description: '',
          time_module: '',

        }}
        validationSchema={newCourseSchema}
        onSubmit={values => {
          // same shape as initial values
          console.log(values);
          setShowModuleForm(true)

        }}
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form>

            <div className={styles.moduleForm} >

              <div>
                <Field className={`fieldShadow ${styles.field}`} name="name_module" placeholder="Nombre del modulo" />
                {errors.name_module && touched.name_module ? (
                  <div className="fieldErrors" >{errors.name_module}</div>
                ) : null}
              </div>


              <div>
                <Field className={`fieldShadow ${styles.field}`} name="time_module" placeholder="Duracion del modulo" />
                {errors.time_module && touched.time_module ? (
                  <div className={"fieldErrors"} >{errors.time_module}</div>
                ) : null}
              </div>

              <div className={styles.moduleDescription}>
                <Field className={`fieldShadow ${styles.field}`} name="description" placeholder="Descripcion" as="textarea" />
                {errors.description && touched.description ? (
                  <div className={"fieldErrors"} >{errors.description}</div>
                ) : null}
              </div>




              <div className={`fieldShadow ${styles.field} ${styles.videoInput}`} >


                <span>Videos del modulo </span>
                  <div className={styles.addVideoBtn}
                    onClick={() => (modalOpen ? closeModal() : openModal())}
                  >Editar o agregar videos
                </div>



              </div>

            </div>

            <GButton
              text={"Agregar Modulo"}
            >
              {" "}
              Abrir
            </GButton>

          </Form>


        )}
      </Formik>
    </div>
  )
}

export default ModuleForm
