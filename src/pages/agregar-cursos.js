import Head from 'next/head';
import CoursesForm from '../components/coursesForms/CourseForm';
import { DashboardLayout } from '../components/dashboard-layout';
import { useState } from 'react';
import Modal from "../components/modal/Modal";
import { AnimatePresence, motion } from 'framer-motion';
import ModuleForm from '../components/coursesForms/ModuleForm';
import VideoForm from '../components/coursesForms/VideoForm';

const Page = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const closeModal = () => setModalOpen(false)
  const openModal = () => setModalOpen(true)

  return (
    <div className={modalOpen ? 'no-scroll': ''}>
      <Head>
        <title>
          Agregar cursos
        </title>
      </Head>

      <div  >
        <CoursesForm
          setModalOpen={setModalOpen}
        />

        <AnimatePresence
          initial={false}
          mode={"wait"}
          onExitComplete={() => null}
        >

          {modalOpen &&
            <Modal modalOpen={modalOpen} text={"asdasdasdasd"} handleClose={closeModal}>
              <VideoForm/>
            </Modal>}

        </AnimatePresence>
      </div>
    </div>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
