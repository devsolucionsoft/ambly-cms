import React from 'react'
import styles from './InstructorForm.module.scss'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import GButton from '../buttons/GButton'

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png"
];

const InstrcutorSchema = Yup.object().shape({
    name_instructor: Yup.string()
        .required('El nombre es requerido'),
    description_instructor: Yup.string()
        .required('La descripcion es requerida'),
    description_secondary: Yup.string()
        .required('la descripcion secundaria es requerida'),
    image_instructor: Yup.mixed()
        .required('La imagen del instructor es requerida')
        .test(
            "fileFormat",
            "Formato no soportado, suba unicamente .png .jpeg, o jpg",
            value => value && SUPPORTED_FORMATS.includes(value.type)),
    image_secondary: Yup.mixed()
        .required('La imagen secundaria es requerida')
        .test(
            "fileFormat",
            "Formato no soportado, suba unicamente .png .jpeg, o jpg",
            value => value && SUPPORTED_FORMATS.includes(value.type)),
    
});



const InstructorEditForm = () => {
    return (
        <div className={styles.instructorFormContainer}>

            <div>
                <h1>Editar Instructor</h1>
                <Formik
                    initialValues={{
                        name_instructor: '',
                        description_instructor: '',
                        description_secondary: '',
                        image_instructor: '',
                        image_secondary: '',
            
                    }}
                    validationSchema={InstrcutorSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
                    {({ errors, touched, setFieldValue }) => (
                        <Form>

                            <div className={styles.form}>

                                <div>

                                    <Field className={`fieldShadow ${styles.field}`} name="name_instructor" placeholder="Nombre del instrcutor" />
                                    {errors.name_instructor && touched.name_instructor ? (
                                        <div className="fieldErrors" >{errors.name_instructor}</div>
                                    ) : null}
                                </div>


                                <div className={`${`fieldShadow ${styles.field}`} ${styles.imgInput}`} >
                                    <span>Imagen del instructor</span>
                                    <input className='uploadButton' id="image_instructor" name="image_instructor" type="file" onChange={(event) => {
                                        setFieldValue("image_instructor", event.currentTarget.files[0]);
                                    }} />
                                    {errors.image_instructor && touched.image_instructor ? (
                                        <div className="fieldErrors fieldErrorsFix" >{errors.image_instructor}</div>
                                    ) : null}
                                </div>


                                <div className={`${`fieldShadow ${styles.field}`} ${styles.imgInput}`} >
                                    <span>Imagen secundaria del instrcutor</span>
                                    <input className='uploadButton' id="image_secondary" name="image_secondary" type="file" onChange={(event) => {
                                        setFieldValue("image_secondary", event.currentTarget.files[0]);
                                    }} />
                                    {errors.image_secondary && touched.image_secondary ? (
                                        <div className="fieldErrors fieldErrorsFix" >{errors.image_secondary}</div>
                                    ) : null}

                                </div>

                                <div className={styles.description1} >

                                    <Field className={` fieldShadow ${styles.field} `} name="description_instructor" placeholder="Descripcion" as="textarea" />
                                    {errors.description_instructor && touched.description_instructor ? (
                                        <div className="fieldErrors" >{errors.description_instructor}</div>
                                    ) : null}
                                </div>


                                <div className={styles.description2}>
                                    <Field className={` fieldShadow ${styles.field} `} name="description_secondary" placeholder="Descripcion secundaria" as="textarea" />
                                    {errors.description_secondary && touched.description_secondary ? (
                                        <div className="fieldErrors" >{errors.description_secondary}</div>
                                    ) : null}
                                </div>

                      

                                <GButton type="submit" text={"Agregar"}>Submit</GButton>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default InstructorEditForm