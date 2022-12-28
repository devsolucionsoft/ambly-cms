import { useState } from "react";
import ModuleForm from "../components/coursesForms/ModuleForm"
import { DashboardLayout } from "../components/dashboard-layout";
import { AnimatePresence } from "framer-motion";
import VideoForm from "../components/coursesForms/VideoForm";
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
              <ModuleForm
                modalOpen={modalOpen}
                closeModal={closeModal}
                openModal={openModal}
              />
              <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
                {modalOpen &&
                  <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>

                    <div className={styles.videoModal} >

                      <div>
                        <VideoList titulo={"Titulo del video"}/>
                        <VideoList titulo={"Titulo del video"}/>
                        <VideoList titulo={"Titulo del video"}/>
                        <VideoList titulo={"Titulo del video"}/>
                        <VideoList titulo={"Titulo del video"}/>
                      </div>
                      <VideoForm/>
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
