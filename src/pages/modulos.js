import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import React from "react";
import ModulesTable from "../components/modules/ModulesTable";
import GButton from "../components/buttons/GButton";
import Link from "next/link";
import { useRouter } from "next/router";
// Api
import { CoursesApi } from "../api/CoursesApi";
import ModuleForm from "../components/coursesForms/ModuleForm";
import Modal from "../components/modal/Modal";
import { AnimatePresence, motion } from "framer-motion";

const Page = () => {
  const CoursesApiModel = new CoursesApi();
  const router = useRouter();
  const { id } = router.query;

  const [itemsCourses, setItemsCourses] = useState([]);
  const [courseInfo, setCourseInfo] = useState({});

  const getCourses = async () => {
    const response = await CoursesApiModel.GetCourses();
    if (response.status === 200) {
      setItemsCourses(response.data);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  useEffect(() => {
    if (id) {
      setCourseInfo(itemsCourses.find((item) => item.id === parseInt(id)));
    }
  }, [id, itemsCourses]);

  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  return (
    <>
      <div className={"container"}>
        <div className="table-header-container">
          <div>
            <h1>Curso ({courseInfo?.name_course})</h1>
            <h2 className="">Modulos</h2>
          </div>

          <GButton text={"Agregar Modulo"} onClick={() => (modalOpen ? closeModal() : openModal())}>
            {" "}
            Abrir
          </GButton>
        </div>

        <ModulesTable
          modulesItems={courseInfo?.modules ? courseInfo.modules : []}
          idCourse={id}
          getCourses={getCourses}
        />

        <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
          {modalOpen && (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <ModuleForm id={id} closeModal={closeModal} getCourses={getCourses} />
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default Page;
