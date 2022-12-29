import { useState, useEffect } from "react";
import ModuleEditForm from "../components/coursesForms/ModuleEditForm";
import { DashboardLayout } from "../components/dashboard-layout";
import { AnimatePresence } from "framer-motion";
import VideoEditForm from "../components/coursesForms/VideoEditForm";
import VideoForm from "../components/coursesForms/VideoForm";
import Modal from "../components/modal/Modal";
import styles from "../styles/ModulesPage.module.scss";
import { VideoList } from "../components/coursesForms/VideoForm";

// Api
import { CoursesApi } from "../api/CoursesApi";
import { useRouter } from "next/router";
import BackButton from "../components/buttons/BackButton";

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

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (course) {
      setCourseInfo(itemsCourses.find((item) => item.id === parseInt(course)));
    }
  }, [course, itemsCourses]);

  return (
    <div style={{position: 'relative'}}>

      <BackButton/>

      <div className={"container"}>
        {courseInfo?.modules && (
          <ModuleEditForm
            modalOpen={modalOpen}
            closeModal={closeModal}
            openModal={openModal}
            editing={() => setIsEditing(true)}
            stopEditing={() => setIsEditing(false)}
            infoModule={courseInfo.modules[module]}
            course={course}
          />
        )}

        <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
          {modalOpen && (

            isEditing ? (
              <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
                <VideoEditForm />
              </Modal>
            ) : (
              <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
                <VideoForm />
              </Modal>
            )

          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
