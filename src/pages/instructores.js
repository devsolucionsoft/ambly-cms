import React, { useState, useEffect } from "react";
// Api
import { InstructorsApi } from "../api/InstructorsApi";
import InstructorForm from "../components/instructors/InstructorForm";
import { DashboardLayout } from "../components/dashboard-layout";
import styles from "../styles/InstructorPage.module.scss";
import InstructorsTable from "../components/instructors/InstructorsTable";
import Modal from "../components/modal/Modal";
import GButton from "../components/buttons/GButton";
import { motion, AnimatePresence } from "framer-motion";
import InstructorEditForm from "../components/instructors/InstrcutorEditForm";
import InstructorReviewForm from "../components/instructors/InstructorReviewForm";

const Page = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const InstructorsApiModel = new InstructorsApi();

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  const [itemsInstructors, setItemsInstructors] = useState([]);

  const getInstructors = async () => {
    const response = await InstructorsApiModel.GetInstructors();
    if (response.status === 200) {
      setItemsInstructors(response.data);
    }
  };

  const [isEditing, setIsEditing] = useState(false);
  const enableEdit = (id) =>
    setIsEditing({
      active: true,
      id: id,
    });
  const disableEdit = () =>
    setIsEditing({
      active: false,
      id: 0,
    });

  const [isAddReview, setAddReview] = useState(false);

  const openReviewForm = (id) => {
    setAddReview({
      active: true,
      id: id,
    });
    closeAddInstrcutor();
    disableEdit();
  };
  const closeReviewForm = () => setAddReview(false);

  const [isAddInstrcutor, setIsAddInstrcutor] = useState(false);
  const addInstrcutor = () => setIsAddInstrcutor(true);
  const closeAddInstrcutor = () => setIsAddInstrcutor(false);

  useEffect(() => {
    getInstructors();
  }, []);

  return (
    <div className={`container`} style={{ paddingBottom: "2em" }}>
      <div className={styles.instructorsContainer}>

      <div className="table-header-container">
        <h1 className="">Instrcutores</h1>
        <GButton
          text={"Agregar Instructor"}
          onClick={() => (modalOpen ? closeModal() : openModal(), addInstrcutor())}
        >
          {" "}
          Abrir
        </GButton>
      </div>

        <InstructorsTable
          modalOpen={modalOpen}
          itemsInstructors={itemsInstructors}
          getInstructors={getInstructors}
          enableEdit={enableEdit}
          openModal={openModal}
          closeModal={closeModal}
          openReviewForm={openReviewForm}
        />

  

        <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
          {modalOpen ? (
            isEditing.active ? (
              <Modal modalOpen={modalOpen} text={""} handleClose={closeModal}>
                <InstructorEditForm
                  itemsInstructors={itemsInstructors}
                  isEditing={isEditing.id}
                  handleClose={closeModal}
                  getInstructors={getInstructors}
                />
              </Modal>
            ) : isAddInstrcutor ? (
              <Modal modalOpen={modalOpen} text={""} handleClose={closeModal}>
                <InstructorForm handleClose={closeModal} getInstructors={getInstructors} />
              </Modal>
            ) : (
              <Modal modalOpen={modalOpen} text={""} handleClose={closeModal}>
                <InstructorReviewForm
                  itemsInstructors={itemsInstructors}
                  isAddReview={isAddReview.id}
                  handleClose={closeModal}
                  getInstructors={getInstructors}
                />
              </Modal>
            )
          ) : (
            (isEditing.active && disableEdit(), isAddReview.active && closeReviewForm())
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
