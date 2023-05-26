import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import { AnimatePresence, motion } from "framer-motion";
import GButton from "../components/buttons/GButton";
import Modal from "../components/modal/Modal";
import AgenciasTable from "../components/agencias/AgenciasTable";
import AgenciaForm from "../components/agencias/AgenciaForm";
import AgenciaEditFrom from "../components/agencias/AgenciaEditFrom";
import Head from "next/head";
// Api
import { AgenciaApi } from "../api/AgenciasApi";

const Page = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  const [isEditing, setIsEditing] = useState(false);
  const editingAgency = (id) => {
    setIsEditing({
      active: true,
      id: id,
    });
  };

  const stopEditingAgency = () => {
    setIsEditing({
      active: false,
      id: 0,
    });
  };

  const AgenciaApiModel = new AgenciaApi();
  const [agenciasItems, setAgencias] = useState([]);

  const getAgencias = async () => {
    const response = await AgenciaApiModel.GetAgencias();
    if (response.status === 200) {
      console.log(response.data);
      setAgencias(response.data);
    }
  };

  useEffect(() => {
    getAgencias();
  }, []);

  return (
    <div className={`container`}>
      <Head>
        <title>Ambly CMS - Agencias</title>
      </Head>

      <div className="table-header-container">
        <h1 className="">Agencias</h1>
        <GButton
          text={"Agregar Agencia"}
          onClick={() => (modalOpen ? closeModal() : openModal(), stopEditingAgency())}
        >
          {" "}
          Abrir
        </GButton>
      </div>
      <AgenciasTable
        editingAgency={editingAgency}
        modalOpen={modalOpen}
        closeModal={closeModal}
        openModal={openModal}
        agenciasItems={agenciasItems}
        getAgencias={getAgencias}
      />
      <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
        {modalOpen &&
          (isEditing.active ? (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <AgenciaEditFrom
                getAgencias={getAgencias}
                closeModal={closeModal}
                isEditing={isEditing.id}
                agenciasItems={agenciasItems}
              />
            </Modal>
          ) : (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <AgenciaForm closeModal={closeModal} getAgencias={getAgencias} />
            </Modal>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default Page;

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
