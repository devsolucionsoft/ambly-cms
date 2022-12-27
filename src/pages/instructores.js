import React, { useState, useEffect } from "react";
import InstructorForm from "../components/instructors/InstructorForm";
import { DashboardLayout } from "../components/dashboard-layout";
import styles from "../styles/InstructorPage.module.scss";
import InstructorsTable from "../components/instructors/InstructorsTable";
import Modal from "../components/modal/Modal";
import GButton from "../components/buttons/GButton";
import { motion, AnimatePresence } from "framer-motion";
// Api
import { InstructorsApi } from "../api/InstructorsApi";

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

  useEffect(() => {
    getInstructors();
  }, []);

  return (
    <div className={`container`} style={{ paddingBottom: "2em" }}>
      <div className={styles.instructorsContainer}>
        <InstructorsTable modalOpen={modalOpen} itemsInstructors={itemsInstructors} getInstructors={getInstructors} />

        <GButton
          text={"Agregar Instructor"}
          onClick={() => (modalOpen ? closeModal() : openModal())}
        >
          {" "}
          Abrir
        </GButton>

        <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
          {modalOpen && (
            <Modal modalOpen={modalOpen} text={"asdasdasdasd"} handleClose={closeModal}>
              <InstructorForm handleClose={closeModal} getInstructors={getInstructors} />
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
