import { useState, useEffect } from "react";
import { dividerClasses } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import SplashTable from "../components/splash/SplashTable";
import { AnimatePresence, motion } from "framer-motion";
import GButton from "../components/buttons/GButton";
import Modal from "../components/modal/Modal";
import SplashForm from "../components/splash/SplashForm";
import SplashEditForm from "../components/splash/SplashEditForm";
import Head from "next/head";
// Api
import { SplashApi } from "../api/SplashApi";

const Page = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);
  const [isEditing, setIsEditing] = useState(false);
  const editingSplash = (id) => {
    setIsEditing({
      active: true,
      id: id,
    });
  };
  const stopEditingSplash = () => {
    setIsEditing({
      active: false,
      id: 0,
    });
  };

  const SplashApiModel = new SplashApi();

  const [itemsSplash, setItemsSplash] = useState([]);

  const getSplash = async () => {
    const response = await SplashApiModel.GetSplash();
    if (response.status === 200) {
      setItemsSplash(response.data);
    }
  };

  useEffect(() => {
    getSplash();
  }, []);

  return (
    <div className={`container`}>
      <Head>
        <title>Ambly CMS - Splash</title>
      </Head>
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
        editingSplash={editingSplash}
        modalOpen={modalOpen}
        closeModal={closeModal}
        openModal={openModal}
        itemsSplash={itemsSplash}
        getSplash={getSplash}
      />
      <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
        {modalOpen &&
          (isEditing.active ? (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <SplashEditForm
                getSplash={getSplash}
                closeModal={closeModal}
                isEditing={isEditing.id}
                itemsSplash={itemsSplash}
              />
            </Modal>
          ) : (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <SplashForm closeModal={closeModal} getSplash={getSplash} />
            </Modal>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default Page;

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
