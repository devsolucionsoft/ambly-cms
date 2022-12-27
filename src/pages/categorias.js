import CategoriesTable from "../components/categories/CategoriesTable"
import { DashboardLayout } from "../components/dashboard-layout";
import GButton from "../components/buttons/GButton";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../components/modal/Modal";
import InstructorForm from "../components/instructors/InstructorForm";
import CategoriesForm from "../components/categories/CategoriesForm";


const Page = () => {


    const [modalOpen, setModalOpen] = useState(false)

    const closeModal = () => setModalOpen(false)
    const openModal = () => setModalOpen(true)
    return (

        <div className="container" >
            <CategoriesTable />

            <GButton
                text={"Agregar Categoria"}
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
                        <CategoriesForm />
                    </Modal>}

            </AnimatePresence>

        </div >
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page