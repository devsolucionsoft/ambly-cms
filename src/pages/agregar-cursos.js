import Head from 'next/head';
import CoursesForm from '../components/coursesForms/CourseForm';
import { DashboardLayout } from '../components/dashboard-layout';
import React, { useState } from 'react';
import Modal from "../components/modal/Modal";
import { AnimatePresence, motion } from 'framer-motion';
import ModuleForm from '../components/coursesForms/ModuleForm';
import VideoForm from '../components/coursesForms/VideoForm';
import Link from 'next/link';
import GButton from '../components/buttons/GButton';

const Page = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const closeModal = () => setModalOpen(false)
  const openModal = () => setModalOpen(true)

  return (


    <div className={"pRelative"}>
      <Head>
        <title>
          Agregar cursos
        </title>
      </Head>


      <div className={"backButton"}>
        <Link  href="cursos">
          <GButton text={"Ir a cursos"}/>
        </Link>
      </div>


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
