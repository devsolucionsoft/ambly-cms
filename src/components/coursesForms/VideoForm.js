import React from 'react'
import { Formik, Form, Field, } from 'formik';
import * as Yup from 'yup';
import styles from './VideoForm.module.scss'
import GButton from '../buttons/GButton';

const SUPPORTED_FORMATS = [
    "video/mp4",
];

const videoSchema = Yup.object().shape({
    name: Yup.string()
        .required('Nombre del video '),
    description: Yup.string()
        .required('Descripcion del video requerida'),
    video: Yup.mixed()
        .required('El video es requerido')
        .test(
            "fileFormat",
            "Formato no soportado, suba unicamente: .mp4",
            value => value && SUPPORTED_FORMATS.includes(value.type))
});

export const VideoList = ({titulo}) => {
  return (
    <>
      <div className={styles.videoListContainer}>
        <h4>{titulo}</h4>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </div>

    </>

  )
}

const VideoForm = () => {
    return (
        <div className={styles.videoFormContainer}>
            <div>
                <h1>Nuevo Video</h1>
                <Formik
                    initialValues={{
                        name: '',
                        description: '',
                        video: ''
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
                                    <input className='uploadButton' id="modules" name="video" type="file" onChange={(event) => {
                                        setFieldValue("video", event.currentTarget.files[0]);
                                    }} />
                                    {errors.video && touched.video ? (
                                        <div className="fieldErrors" >{errors.video}</div>
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
