import { useState, useEffect } from "react";
import ModuleEditForm from "../components/coursesForms/ModuleEditForm";
import { DashboardLayout } from "../components/dashboard-layout";
import { AnimatePresence } from "framer-motion";
import VideoEditForm from "../components/coursesForms/VideoEditForm";
import Modal from "../components/modal/Modal";
import styles from "../styles/ModulesPage.module.scss";
import { VideoList } from "../components/coursesForms/VideoForm";
// Api
import { CoursesApi } from "../api/CoursesApi";
import { useRouter } from "next/router";

const Page = () => {
  const CoursesApiModel = new CoursesApi();
  const router = useRouter();

  const { course, module } = router.query;

  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  const [itemsCourses, setItemsCourses] = useState([]);
  const [courseInfo, setCourseInfo] = useState({});

  const getCourses = async () => {
    const response = await CoursesApiModel.GetCourses();
    if (response.status === 200) {
      setItemsCourses(response.data);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (course) {
      setCourseInfo(itemsCourses.find((item) => item.id === parseInt(course)));
    }
  }, [course, itemsCourses]);

  return (
    <>
      <div className={"container"}>
        {courseInfo?.modules && (
          <ModuleEditForm
            modalOpen={modalOpen}
            closeModal={closeModal}
            openModal={openModal}
            infoModule={courseInfo.modules[module]}
            course={course}
          />
        )}

        <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
          {modalOpen && (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <div className={styles.videoModal}>
                <div>
                  <h3 style={{ textAlign: "center" }}>Selecciona un video para editar</h3>

                  <VideoList titulo={"Titulo del video"} />
                  <VideoList titulo={"Titulo del video"} />
                  <VideoList titulo={"Titulo del video"} />
                  <VideoList titulo={"Titulo del video"} />
                  <VideoList titulo={"Titulo del video"} />
                </div>
                <VideoEditForm />
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
