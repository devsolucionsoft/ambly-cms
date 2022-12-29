import { useState, useEffect } from "react";
import ModuleForm from "../components/coursesForms/ModuleForm";
import { DashboardLayout } from "../components/dashboard-layout";
import { AnimatePresence } from "framer-motion";
import VideoForm from "../components/coursesForms/VideoForm";
import Modal from "../components/modal/Modal";
import styles from "../styles/ModulesPage.module.scss";
import { VideoList } from "../components/coursesForms/VideoForm";
import { useRouter } from "next/router";
// Api
import { CoursesApi } from "../api/CoursesApi";

const Page = () => {
  const CoursesApiModel = new CoursesApi();
  const router = useRouter();
  const { id } = router.query;

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
    if (id) {
      setCourseInfo(itemsCourses.find((item) => item.id === parseInt(id)));
    }
  }, [id, itemsCourses]);

  return (
    <>
      <div className={"container"}>
        <ModuleForm modalOpen={modalOpen} closeModal={closeModal} openModal={openModal} />
        <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
          {modalOpen && (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <div className={styles.videoModal}>
                <div>
                  <h3 style={{ textAlign: "center" }}>Videos del modulo</h3>

                  <VideoList titulo={"Titulo del video"} />
                  <VideoList titulo={"Titulo del video"} />
                  <VideoList titulo={"Titulo del video"} />
                  <VideoList titulo={"Titulo del video"} />
                  <VideoList titulo={"Titulo del video"} />
                </div>
                <VideoForm />
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
