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
import { TrailersApi } from "../api/TrailersApi";

const Page = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);
  const [isEditing, setIsEditing] = useState(false);
  const editingTrailers = (id) => {
    setIsEditing({
      active: true,
      id: id,
    });
  };
  const stopEditingTrailers = () => {
    setIsEditing({
      active: false,
      id: 0,
    });
  };

  const TrailersApiModel = new TrailersApi();

  const [itemsTrailers, setItemsTrailers] = useState([]);

  const getTrailers = async () => {
    const response = await TrailersApiModel.GetTrailers();
    if (response.status === 200) {
      setItemsTrailers(response.data);
    }
  };

  useEffect(() => {
    getTrailers();
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
          onClick={() => (modalOpen ? closeModal() : openModal(), stopEditingTrailers())}
        >
          {" "}
          Abrir
        </GButton>
      </div>
      <AgenciasTable
        editingTrailers={editingTrailers}
        modalOpen={modalOpen}
        closeModal={closeModal}
        openModal={openModal}
        itemsTrailers={itemsTrailers}
        getTrailers={getTrailers}
      />
      <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
        {modalOpen &&
          (isEditing.active ? (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <AgenciaEditFrom
                getTrailers={getTrailers}
                closeModal={closeModal}
                isEditing={isEditing.id}
                itemsTrailers={itemsTrailers}
              />
            </Modal>
          ) : (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <AgenciaForm closeModal={closeModal} getTrailers={getTrailers} />
            </Modal>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default Page;

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
