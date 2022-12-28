import CategoriesTable from "../components/categories/CategoriesTable";
import { DashboardLayout } from "../components/dashboard-layout";
import GButton from "../components/buttons/GButton";
import { useEffect, useState } from "react";
import Link from 'next/link'
// Api
import { CategoriesApi } from "../api/CategoriesApi";
import CoursesTable from '../components/courses/CoursesTable';
import Modal from '../components/modal/Modal';
import CategoriesEditForm from '../components/categories/CategoriesEditForm';
import CategoriesForm from '../components/categories/CategoriesForm';
import { AnimatePresence } from 'framer-motion';
import CoursesForm from '../components/coursesForms/CourseForm';
import CourseEditForm from '../components/coursesForms/CourseEditForm';


const Page = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const CategoriesApiModel = new CategoriesApi();
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

  const [itemsCategories, setItemsCategories] = useState([]);

  const getCategories = async () => {
    const response = await CategoriesApiModel.GetCategories();
    if (response.status === 200) {
      setItemsCategories(response.data);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container" style={{ paddingBottom: "2em" }}>
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

        editingCategory={editingCourse}
        modalOpen={modalOpen}
        closeModal={closeModal}
        openModal={openModal}
      />

      <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
        {modalOpen &&
          (isEditing.active ? (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <CourseEditForm/>
            </Modal>
          ) : (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <CoursesForm closeModal={closeModal} getCategories={getCategories} />
            </Modal>
          ))}
      </AnimatePresence>

    </div>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
