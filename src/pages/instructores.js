import React, { useState } from "react"
import InstructorForm from "../components/instructors/InstructorForm"
import { DashboardLayout } from "../components/dashboard-layout"
import styles from '../styles/InstructorPage.module.scss'
import InstructorsTable from "../components/instructors/InstructorsTable"
import Modal from "../components/modal/Modal"
import GButton from "../components/buttons/GButton"
import { motion, AnimatePresence } from "framer-motion"

const Page = () => {

    const [modalOpen, setModalOpen] = useState(false)

    const closeModal = () => setModalOpen(false)
    const openModal = () => setModalOpen(true)

    return (

        <div className={`container`}>



            <div className={styles.instructorsContainer}>

                <InstructorsTable
                    modalOpen={modalOpen}
                />

                <GButton
                    text={"Agregar Instructor"}
                    onClick={() => (modalOpen ? closeModal() : openModal())}
                > Abrir
                </GButton>

                <AnimatePresence
                    initial={false}
                    mode={"wait"}
                    onExitComplete={() => null}
                >

                    {modalOpen &&
                        <Modal modalOpen={modalOpen} text={"asdasdasdasd"} handleClose={closeModal}>
                            <InstructorForm />
                        </Modal>}

                </AnimatePresence>

            </div>
        </div>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page