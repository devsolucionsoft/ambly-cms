import React, { useState, useEffect } from "react";
import styles from "./TrailersForm.module.scss";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import GButton from "../buttons/GButton";
import Swal from "sweetalert2";
// Api
import { SettingApi } from "../../api/SettingApi";
import { TrailersApi } from "../../api/TrailersApi";
import { InstructorsApi } from "../../api/InstructorsApi";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const TrailersSchema = Yup.object().shape({
  course_name: Yup.string().required("Nombre del trailer requerido"),
  instructor: Yup.string().required("Descripcion requerida"),
  video: Yup.mixed().test(
    "fileFormat",
    "Formato no soportado, suba unicamente: .png .jpeg, o jpg",
    (value) => (value ? SUPPORTED_FORMATS.includes(value.type) : true)
  ),
});

const TrailersEditForm = (props) => {
  const { isEditing, itemsTrailers, getTrailers, closeModal } = props;

  const SettingApiModel = new SettingApi();
  const TrailersApiModel = new TrailersApi();

  const [formvalues, setFromValues] = useState(false);

  const InstructorsApiModel = new InstructorsApi();

  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await InstructorsApiModel.GetInstructors();
      response.status === 200 && setInstructors(response.data);
    })();
  }, []);

  useEffect(() => {
    setFromValues(itemsTrailers.find((item) => item.id === isEditing));
  }, [isEditing]);

  return (
    <div className={styles.TrailersFormContainer}>
      <div>
        <h1>Editar Trailers</h1>
        {formvalues && (
          <Formik
            initialValues={{
              course_name: formvalues.course_name,
              instructor: formvalues.instructor,
              video: false,
            }}
            validationSchema={TrailersSchema}
            onSubmit={async (values) => {
              let data = {
                course_name: values.course_name,
                instructor: values.instructor,
                video: formvalues.video
              };

              if (values.video) {
                const responseImg = await SettingApiModel.uploadImage(values.image);

                if (responseImg.status === 201) {
                  data = { ...data, video: responseImg.data.imageUrl };
                }
              }

              const response = await TrailersApiModel.EditeTrailers(data, isEditing);

              switch (response.status) {
                case 201:
                  getTrailers();
                  Swal.fire({
                    title: "Trailer editado",
                    icon: "success",
                  }).then(() => {
                    closeModal();
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
            }}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <div className={styles.form}>
                  <div>
                    <Field
                      className={`fieldShadow ${styles.field}`}
                      name="course_name"
                      placeholder="Nombre del Trailers"
                    />
                    {errors.course_name && touched.course_name ? (
                      <div className="fieldErrors">{errors.course_name}</div>
                    ) : null}
                  </div>

                  <div className={`${`fieldShadow ${styles.field}`} ${styles.imgInput}`}>
                    <span>Video del Trailer</span>
                    <input
                      className="uploadButton"
                      id="video"
                      name="video"
                      type="file"
                      onChange={(event) => {
                        setFieldValue("video", event.currentTarget.files[0]);
                      }}
                    />
                    {errors.video && touched.video ? (
                      <div className="fieldErrors">{errors.video}</div>
                    ) : null}
                  </div>

                  <div>
                    <Field className={`fieldShadow ${styles.field}`} name="instructor" as="select">
                      <option defaultValue disabled value="">
                        Selecciona un instructor
                      </option>
                      {instructors.map((item) => (
                        <option
                          key={item.id}
                          value={item.name_instructor}
                          style={{ display: "flex" }}
                        >
                          {item.name_instructor}
                        </option>
                      ))}
                    </Field>
                    {errors.instructor && touched.instructor ? (
                      <div className="fieldErrors">{errors.instructor}</div>
                    ) : null}
                  </div>

                  <GButton type="submit" text={"Agregar"}>
                    Submit
                  </GButton>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default TrailersEditForm;
