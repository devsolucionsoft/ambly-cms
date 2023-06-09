import CoursesTable from "../components/courses/CoursesTable";
import { DashboardLayout } from "../components/dashboard-layout";
import GButton from "../components/buttons/GButton";
import { useEffect, useState } from "react";
// Api
import { CoursesApi } from "../api/CoursesApi";
import Modal from "../components/modal/Modal";
import { AnimatePresence } from "framer-motion";
import CoursesForm from "../components/coursesForms/CourseForm";
import CourseEditForm from "../components/coursesForms/CourseEditForm";
import Head from "next/head";

const Page = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const CoursesApiModel = new CoursesApi();

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);
  const [isEditing, setIsEditing] = useState(false);

  const editingCourse = (id) => {
    setIsEditing({
      active: true,
      id: id,
    });
  };
  const stopEditingCourse = () => {
    setIsEditing({
      active: false,
      id: 0,
    });
  };

  const [itemsCourses, setItemsCourses] = useState([]);

  const getCourses = async () => {
    const response = await CoursesApiModel.GetCourses();
    if (response.status === 200) {
      setItemsCourses(response.data);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="container" style={{ paddingBottom: "2em" }}>
      <Head>
        <title>Ambly CMS - Cursos</title>
      </Head>

      <div className="table-header-container">
        <h1 className="">Cursos</h1>

        <GButton
          text={"Agregar Curso"}
          onClick={() => (modalOpen ? closeModal() : openModal(), stopEditingCourse())}
        >
          {" "}
          Abrir
        </GButton>
      </div>

      <CoursesTable
        editingCourse={editingCourse}
        modalOpen={modalOpen}
        closeModal={closeModal}
        openModal={openModal}
        itemsCourses={itemsCourses}
        getCourses={getCourses}
      />

      <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
        {modalOpen &&
          (isEditing.active ? (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <CourseEditForm
                itemsCourses={itemsCourses}
                isEditing={isEditing.id}
                getCourses={getCourses}
                closeModal={closeModal}
              />
            </Modal>
          ) : (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <CoursesForm closeModal={closeModal} getCourses={getCourses} />
            </Modal>
          ))}
      </AnimatePresence>
    </div>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
