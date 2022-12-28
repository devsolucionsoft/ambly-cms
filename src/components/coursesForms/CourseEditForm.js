import React, { useState, } from 'react'
import { Formik, Form, Field, } from 'formik';
import * as Yup from 'yup';
import styles from './CoursesForms.module.scss'
import ModuleForm from './ModuleForm'
import GButton from '../buttons/GButton';
import Link from 'next/link';



const CoursesForm = () => {


  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png"
  ];


  const newCourseSchema = Yup.object().shape({
    name_course: Yup.string()
                    .required('El nombre del curso es requerido'),
    description: Yup.string()
                    .required('La descripcion del curso es requerida'),
    image_course: Yup.mixed()
                     .required('La imagen del curso es requerida')
                     .test(
                       "fileFormat",
                       "Formato no soportado, suba unicamente: .png .jpeg, o jpg",
                       value => value && SUPPORTED_FORMATS.includes(value.type)),
    time_course: Yup.string()
                    .required('La duracion del curso es requerida'),
    price: Yup.string()
              .required('El precio es requerido',),
    instructor: Yup.string()
                   .required('Seleccione un instrcutor'),
    category: Yup.string()
                 .required('Seleccione una categoria'),
    // characteristic1: Yup.string()
    //     .required('Required'),
    characteristic2: Yup.string()
                        .required('Este campo es requerido'),
    characteristic4: Yup.string()
                        .required('Este campo es requerido')
  });

  return (
    <div className={`${styles.courseFormContainer} ${styles.formContainer}`}>

      < h1>Editar Curso</h1>

      <Formik
        initialValues={{
          name_course: '',
          instructor: '',
          category: '',
          description: '',
          image_course: '',
          price: '',
          time_course: '',
          characteristic1: '',
          characteristic2: '',
          characteristic4: ''
        }}
        validationSchema={newCourseSchema}
        onSubmit={values => {
          // same shape as initial values
          console.log(values);


        }}
      >
        {({ errors, touched, isSubmitting, handleChange, event, setFieldValue }) => (
          <Form>

            <div className={styles.courseForm}>

              <div className={styles.formGroup1}>

                <div>
                  <Field className={`fieldShadow ${styles.field}`} name="name_course" placeholder="Nombre del curso" />
                  {errors.name_course && touched.name_course ? (
                    <div className="fieldErrors" >{errors.name_course}</div>
                  ) : null}

                </div>

                <div>

                  <Field className={`fieldShadow ${styles.field}`} name="instructor" as="select">
                    <option defaultValue disabled value="">Selecciona un instructor</option>
                    <option value="1">Instructor 1</option>
                    <option value="2">Instructor 2</option>
                    <option value="3">Instructor 3</option>
                  </Field>
                  {errors.instructor && touched.instructor ? (
                    <div className="fieldErrors" >{errors.instructor}</div>
                  ) : null}
                </div>

                <div>

                  <Field className={`fieldShadow ${styles.field}`} name="category" as="select">
                    <option defaultValue disabled value="">Selecciona una categoria</option>
                    <option value="1">categoria 1</option>
                    <option value="2">categoria 2</option>
                    <option value="3">categoria 3</option>
                  </Field>
                  {errors.category && touched.category ? (
                    <div className="fieldErrors" >{errors.category}</div>
                  ) : null}
                </div>

                <div className={styles.descriptionContainer}>

                  <Field className={`fieldShadow ${styles.courseDescriptionField}`} name="description" as="textarea" placeholder="Descripcion del curso" />
                  {errors.description && touched.description ? (
                    <div className="fieldErrors" >{errors.description}</div>
                  ) : null}
                </div>
              </div>

              <div className={styles.formGroup2}>


                <div className={`fieldShadow ${styles.field} ${styles.imgInput}`} >
                  <span>Imagen del curso</span>
                  <input className='uploadButton' id="image_course" name="image_course" type="file" onChange={(event) => {
                    setFieldValue("image_course", event.currentTarget.files[0]);
                  }} />
                  {errors.image_course && touched.image_course ? (
                    <div className="fieldErrors" >{errors.image_course}</div>
                  ) : null}

                </div>


                <div>

                  <Field className={`fieldShadow ${styles.field}`} name="price" placeholder="Precio" />
                  {errors.price && touched.price ? (
                    <div className="fieldErrors" >{errors.price}</div>
                  ) : null}
                </div>

                <div>
                  <Field className={`fieldShadow ${styles.field}`} name="time_course" placeholder="Duración" />
                  {errors.time_course && touched.time_course ? (
                    <div className="fieldErrors" >{errors.time_course}</div>
                  ) : null}
                </div>


                <div>

                  <Field className={`fieldShadow ${styles.field}`} name="characteristic2" placeholder="Aprenderás..." />
                  {errors.characteristic2 && touched.characteristic2 ? (
                    <div className="fieldErrors" >{errors.characteristic2}</div>
                  ) : null}
                </div>

                <div>

                  <Field className={`fieldShadow ${styles.field}`} name="characteristic4" placeholder="Estructura" />
                  {errors.characteristic4 && touched.characteristic4 ? (
                    <div className="fieldErrors" >{errors.characteristic4}</div>
                  ) : null}
                </div>
              </div>


            </div>

            <GButton text={"Agregar Curso"} type="submit" disabled={isSubmitting}  >
              Agregar Modulos
            </GButton>



          </Form>
        )}
      </Formik>

    </div>
  )
}

export default CoursesForm
