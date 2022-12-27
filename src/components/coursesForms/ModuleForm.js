import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './CoursesForms.module.scss'







const ModuleForm = ({setModalOpen}) => {


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
            modules: ''

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
                {errors.characteristic2 && touched.characteristic2 ? (
                  <div>{errors.characteristic2}</div>
                ) : null}



                <Field className={`fieldShadow ${styles.field}`} name="time_module" placeholder="Duracion del modulo" />
                {errors.characteristic2 && touched.characteristic2 ? (
                  <div>{errors.characteristic2}</div>
                ) : null}

                <Field className={`${`fieldShadow ${styles.field}`} ${styles.moduleDescription}`} name="description" placeholder="Descripcion" as="textarea" />
                {errors.characteristic2 && touched.characteristic2 ? (
                  <div>{errors.characteristic2}</div>
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
      <h2>Nuevo modulo</h2>

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
              {errors.characteristic2 && touched.characteristic2 ? (
                <div>{errors.characteristic2}</div>
              ) : null}



              <Field className={`fieldShadow ${styles.field}`} name="time_module" placeholder="Duracion del modulo" />
              {errors.characteristic2 && touched.characteristic2 ? (
                <div>{errors.characteristic2}</div>
              ) : null}

              <Field className={`fieldShadow ${styles.field} ${styles.moduleDescription}`} name="description" placeholder="Descripcion" as="textarea" />
              {errors.characteristic2 && touched.characteristic2 ? (
                <div>{errors.characteristic2}</div>
              ) : null}


              <div className={`fieldShadow ${styles.field} ${styles.videoInput}`} >

             <span>Videos del modulo </span>
                <div
                  onClick={() => setModalOpen(true)}
                >Agregar...</div>

                {/*
                <input className='uploadButton' id="modules" name="modules" type="file" onChange={(event) => {
                  setFieldValue("modules", event.currentTarget.files[0]);
                }} />
                {errors.modules && touched.modules ? (
                  <div className="fieldErrors" >{errors.modules}</div>
                ) : null} */}

              </div>

            </div>

          </Form>
        )}
      </Formik>
    </div>
  )
}

export default ModuleForm