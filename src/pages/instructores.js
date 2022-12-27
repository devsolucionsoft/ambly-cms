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
  const enableEdit = () => setIsEditing(true);
  const disableEdit = () => setIsEditing(false);

  const [isAddReview, setAddReview] = useState(false);

  const openReviewForm = () => {
    setAddReview(true);
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
        <InstructorsTable
          modalOpen={modalOpen}
          itemsInstructors={itemsInstructors}
          getInstructors={getInstructors}
          enableEdit={enableEdit}
          openModal={openModal}
          closeModal={closeModal}
          openReviewForm={openReviewForm}
        />

        <GButton
          text={"Agregar Instructor"}
          onClick={() => (modalOpen ? closeModal() : openModal())}
        >
          {" "}
          Abrir
        </GButton>

        <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
          {modalOpen ? (
            isEditing ? (
              <Modal modalOpen={modalOpen} text={""} handleClose={closeModal}>
                <InstructorEditForm />
              </Modal>
            ) : isAddInstrcutor ? (
              <Modal modalOpen={modalOpen} text={""} handleClose={closeModal}>
                <InstructorForm handleClose={closeModal} getInstructors={getInstructors} />
              </Modal>
            ) : (
              <Modal modalOpen={modalOpen} text={""} handleClose={closeModal}>
                <InstructorReviewForm />
              </Modal>
            )
          ) : (
            (isEditing && disableEdit(), isAddReview && closeReviewForm())
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
