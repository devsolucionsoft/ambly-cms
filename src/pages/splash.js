
import { useState } from 'react'
import { dividerClasses } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import SplashTable from "../components/splash/SplashTable";
import { AnimatePresence, motion } from "framer-motion";
import GButton from '../components/buttons/GButton';
import Modal from '../components/modal/Modal';
import SplashForm from '../components/splash/SplashForm';
import SplashEditForm from '../components/splash/SplashEditForm';

const Page = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => setModalOpen(false);
    const openModal = () => setModalOpen(true);
    const [isEditing, setIsEditing] = useState(false)
    const editingSplash = () => {setIsEditing(true)}
    const stopEditingSplash = () => {setIsEditing(false)}


    return (

        <div className={`container`}>
            <div className="table-header-container">
                <h1 className="">Splash</h1>
                <GButton
                    text={"Agregar Splash"}
                    onClick={() => (modalOpen ? closeModal() : openModal(), stopEditingSplash())}
                >
                {" "}
                Abrir
                </GButton>
            </div>

            <SplashTable 
                editingSplash={editingSplash} modalOpen={modalOpen} closeModal={closeModal} openModal={openModal}
            />

            <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
                {modalOpen && (

                    isEditing ? (
                        (<Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
                            <SplashEditForm />
                        </Modal>)
                    ) :
                        (<Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
                            <SplashForm closeModal={closeModal}  />
                        </Modal>)
                )}
            </AnimatePresence>

        </div>
    )
}

export default Page

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);


