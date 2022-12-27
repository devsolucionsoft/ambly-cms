import React from 'react'
import styles from './CategoriesForm.module.scss'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import GButton from '../buttons/GButton'


const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/png"
];

const CategorySchema = Yup.object().shape({
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

const CategoriesForm = () => {
    return (
        <div className={styles.categoryFormContainer}>

            <div>
                <h1>Nuevo Categoria</h1>
                <Formik
                    initialValues={{
                        name: '',
                        description: '',
                        image: ''
                    }}
                    validationSchema={CategorySchema}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
                    {({ errors, touched, setFieldValue }) => (
                        <Form>

                            <div className={styles.form}>

                                <div>

                                    <Field className={`fieldShadow ${styles.field}`} name="name" placeholder="Nombre de la categoria" />
                                    {errors.name && touched.name ? (
                                        <div className="fieldErrors" >{errors.name}</div>
                                    ) : null}
                                </div>


                                <div className={`${`fieldShadow ${styles.field}`} ${styles.imgInput}`} >
                                    <span>Imagen del de la categoria</span>
                                    <input className='uploadButton' id="image" name="image" type="file" onChange={(event) => {
                                        setFieldValue("image", event.currentTarget.files[0]);
                                    }} />
                                    {errors.image && touched.image ? (
                                        <div className="fieldErrors" >{errors.image}</div>
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

export default CategoriesForm