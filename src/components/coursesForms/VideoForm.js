import React from 'react'
import { Formik, Form, Field, } from 'formik';
import * as Yup from 'yup';
import styles from './CoursesForms.module.scss'
import GButton from '../buttons/GButton';

const SUPPORTED_FORMATS = [
    "video/jpg",
    "video/jpeg",
    "video/png"
];

const videoSchema = Yup.object().shape({
    name: Yup.string()
        .required('Nombre de la categoria requerido'),
    description: Yup.string()
        .required('Descripcion de la categoria requerida'),
    image: Yup.mixed()
        .required('La imagen es requerida')
        .test(
            "fileFormat",
            "Formato no soportado, suba unicamente: .png .jpeg, o jpg",
            value => value && SUPPORTED_FORMATS.includes(value.type))
});

const VideoForm = () => {
    return (
        <div className={styles.categoryFormContainer}>

            <div>
                <h1>Nuevo Video</h1>
                <Formik
                    initialValues={{
                        name: '',
                        description: '',
                        image: ''
                    }}
                    validationSchema={videoSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
                    {({ errors, touched, setFieldValue }) => (
                        <Form>

                            <div className={styles.form}>

                                <div>

                                    <Field className={`fieldShadow ${styles.field}`} name="name" placeholder="Nombre del video" />
                                    {errors.name && touched.name ? (
                                        <div className="fieldErrors" >{errors.name}</div>
                                    ) : null}
                                </div>


                                <div className={`fieldShadow ${styles.field} ${styles.videoInput}`} >
                                    <input className='uploadButton' id="modules" name="modules" type="file" onChange={(event) => {
                                        setFieldValue("modules", event.currentTarget.files[0]);
                                    }} />
                                    {errors.modules && touched.modules ? (
                                        <div className="fieldErrors" >{errors.modules}</div>
                                    ) : null}

                                </div>

                                <div className={styles.description1} >

                                    <Field className={` fieldShadow ${styles.field} `} name="description" placeholder="Descripcion" as="textarea" />
                                    {errors.description && touched.description ? (
                                        <div className="fieldErrors" >{errors.description}</div>
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


export default VideoForm