import React from 'react'
import styles from './InstructorReviewForm.module.scss'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import GButton from '../buttons/GButton'


const ReviewSchema = Yup.object().shape({
    review: Yup.string()
        .required('La review es requerida'),
    author: Yup.string()
        .required('El nombre del autor es requerido'),
});

const InstrcutorReviewForm = () => {
    return (
        <div className={styles.reviewFormContainer}>

            <div>
                <h1>Nueva Review</h1>
                <Formik
                    initialValues={{
                        review: '',
                        author: '',
                
                    }}
                    validationSchema={ReviewSchema}
                    onSubmit={values => {
                        // same shape as initial values
                        console.log(values);
                    }}
                >
                    {({ errors, touched, setFieldValue }) => (
                        <Form>

                            <div className={styles.form}>

                                <div>

                                    <Field className={`fieldShadow ${styles.field}`} name="author" placeholder="Autor" />
                                    {errors.author && touched.author ? (
                                        <div className="fieldErrors" >{errors.author}</div>
                                    ) : null}
                                </div>

                                <div className={styles.review} >

                                    <Field className={` fieldShadow ${styles.field} `} name="review" placeholder="Review" as="textarea" />
                                    {errors.review && touched.review ? (
                                        <div className="fieldErrors" >{errors.review}</div>
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

export default InstrcutorReviewForm