import { useState } from "react";
import ModuleEditForm from "../components/coursesForms/ModuleEditForm"
import { DashboardLayout } from "../components/dashboard-layout";
import { AnimatePresence } from "framer-motion";
import VideoEditForm from "../components/coursesForms/VideoEditForm";
import Modal from '../components/modal/Modal';
import styles from '../styles/ModulesPage.module.scss'
import {VideoList} from '../components/coursesForms/VideoForm';

const Page = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const closeModal = () => setModalOpen(false);
    const openModal = () => setModalOpen(true);

    return (
        <>
            <div className={"container"}>
              <ModuleEditForm
                modalOpen={modalOpen}
                closeModal={closeModal}
                openModal={openModal}
              />
              <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
                {modalOpen &&
                  <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>

                    <div className={styles.videoModal} >

                      <div>
                      <h3 style={{textAlign: "center"}}>Selecciona un video para editar</h3>

                        <VideoList titulo={"Titulo del video"}/>
                        <VideoList titulo={"Titulo del video"}/>
                        <VideoList titulo={"Titulo del video"}/>
                        <VideoList titulo={"Titulo del video"}/>
                        <VideoList titulo={"Titulo del video"}/>
                      </div>
                      <VideoEditForm/>
                    </div>

                  </Modal>
                }
              </AnimatePresence>


            </div>



        </>
    )
}

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page