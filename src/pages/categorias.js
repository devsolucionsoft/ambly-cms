import CategoriesTable from "../components/categories/CategoriesTable";
import { DashboardLayout } from "../components/dashboard-layout";
import GButton from "../components/buttons/GButton";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Modal from "../components/modal/Modal";
import CategoriesForm from "../components/categories/CategoriesForm";
import Head from "next/head";
// Api
import { CategoriesApi } from "../api/CategoriesApi";
import CategoriesEditForm from "../components/categories/CategoriesEditForm";

const Page = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const CategoriesApiModel = new CategoriesApi();

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);
  const [isEditing, setIsEditing] = useState(false);
  const editingCategory = (id) => {
    setIsEditing({
      active: true,
      id: id,
    });
  };
  const stopEditingCategory = () => {
    setIsEditing({
      active: false,
      id: 0,
    });
  };

  const [itemsCategories, setItemsCategories] = useState([]);

  const getCategories = async () => {
    const response = await CategoriesApiModel.GetCategories();
    if (response.status === 200) {
      setItemsCategories(response.data);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container" style={{ paddingBottom: "2em" }}>

      <Head>
        <title>
          Ambly CMS - Categorias
        </title>
      </Head>

      <div className="table-header-container">
        <h1 className="">Categorias</h1>
        <GButton
          text={"Agregar Categoria"}
          onClick={() => (modalOpen ? closeModal() : openModal(), stopEditingCategory())}
        >
          {" "}
          Abrir
        </GButton>
      </div>

      <CategoriesTable
        itemsCategories={itemsCategories}
        getCategories={getCategories}
        editingCategory={editingCategory}
        modalOpen={modalOpen}
        closeModal={closeModal}
        openModal={openModal}
      />

      <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
        {modalOpen &&
          (isEditing.active ? (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <CategoriesEditForm
                getCategories={getCategories}
                isEditing={isEditing.id}
                closeModal={closeModal}
                itemsCategories={itemsCategories}
              />
            </Modal>
          ) : (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <CategoriesForm closeModal={closeModal} getCategories={getCategories} />
            </Modal>
          ))}
      </AnimatePresence>
    </div>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
