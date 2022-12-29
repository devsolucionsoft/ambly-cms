import React, { useState, useEffect } from "react";
import ModuleEditForm from "../components/coursesForms/ModuleEditForm";
import { DashboardLayout } from "../components/dashboard-layout";
import { AnimatePresence } from "framer-motion";
import VideoEditForm from "../components/coursesForms/VideoEditForm";
import VideoForm from "../components/coursesForms/VideoForm";
import Modal from "../components/modal/Modal";
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

  const [isEditing, setIsEditing] = useState({
    active: false,
    idVideo: 0,
  });

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (course) {
      setCourseInfo(itemsCourses.find((item) => item.id === parseInt(course)));
    }
  }, [course, itemsCourses]);

  console.log(courseInfo.modules[module]);

  return (
    <>
      <div className={"container"}>
        {courseInfo?.modules && (
          <React.Fragment>
            <ModuleEditForm
              modalOpen={modalOpen}
              closeModal={closeModal}
              openModal={openModal}
              getCourses={getCourses}
              editing={(id) =>
                setIsEditing({
                  active: true,
                  idVideo: id,
                })
              }
              stopEditing={() =>
                setIsEditing({
                  active: false,
                  idVideo: 0,
                })
              }
              infoModule={courseInfo.modules[module]}
              course={course}
            />
            <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
              {modalOpen &&
                (isEditing.active ? (
                  <Modal
                    modalOpen={modalOpen}
                    text={""}
                    closeModal={closeModal}
                    handleClose={closeModal}
                  >
                    <VideoEditForm
                      videosItems={courseInfo.modules[module].videos}
                      idVideo={isEditing.idVideo}
                      getCourses={getCourses}
                      closeModal={closeModal}
                    />
                  </Modal>
                ) : (
                  <Modal
                    modalOpen={modalOpen}
                    text={""}
                    closeModal={closeModal}
                    handleClose={closeModal}
                  >
                    <VideoForm
                      idModule={courseInfo.modules[module].id}
                      closeModal={closeModal}
                      getCourses={getCourses}
                    />
                  </Modal>
                ))}
            </AnimatePresence>
          </React.Fragment>
        )}
      </div>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
