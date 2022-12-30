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

const SUPPORTED_FORMATS = ["video/mp4", "video/x-m4v"];

const TrailersSchema = Yup.object().shape({
  course_name: Yup.string().required("Nombre del curso requerido"),
  instructor: Yup.string().required("Instructor requerida"),
  video: Yup.mixed()
    .required("La video es requerido")
    .test(
      "fileFormat",
      "Formato no soportado, suba unicamente: .mp4 .x-m4v, o jpg",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

const TrailersForm = (props) => {
  const { getTrailers, closeModal } = props;
  const SettingApiModel = new SettingApi();
  const TrailersApiModel = new TrailersApi();
  const [loader, setLoader] = useState(false);

  const InstructorsApiModel = new InstructorsApi();

  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await InstructorsApiModel.GetInstructors();
      response.status === 200 && setInstructors(response.data);
    })();
  }, []);

  return (
    <div className={styles.TrailersFormContainer}>
      <div>
        <h1>Nuevo Trailer</h1>
        <Formik
          initialValues={{
            course_name: "",
            instructor: "",
            video: "",
          }}
          validationSchema={TrailersSchema}
          onSubmit={async (values) => {
            if (!loader) {
              setLoader(true);
              const responseImage = await SettingApiModel.uploadImage(values.video);

              if (responseImage.status === 201) {
                const response = await TrailersApiModel.CreateTrailers({
                  ...values,
                  video: responseImage.data.imageUrl,
                });

                switch (response.status) {
                  case 201:
                    getTrailers();
                    Swal.fire({
                      course_name: "Trailer creado",
                      icon: "success",
                    }).then(() => {
                      closeModal();
                    });
                    break;
                  default:
                    Swal.fire({
                      course_name: "Ha ocurrido un error",
                      text: "Intentalo mas tarde",
                      icon: "error",
                    });
                    break;
                }
              } else {
                Swal.fire({
                  course_name: "Ha ocurrido un error",
                  text: "Intentalo mas tarde",
                  icon: "error",
                });
              }
              setLoader(false);
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

                <GButton type="submit" text={loader ? "cargando..." : "Agregar"}>
                  Submit
                </GButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TrailersForm;
