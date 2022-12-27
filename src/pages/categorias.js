import CategoriesTable from "../components/categories/CategoriesTable";
import { DashboardLayout } from "../components/dashboard-layout";
import GButton from "../components/buttons/GButton";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Modal from "../components/modal/Modal";
import CategoriesForm from "../components/categories/CategoriesForm";
// Api
import { CategoriesApi } from "../api/CategoriesApi";
import CategoriesEditForm from "../components/categories/CategoriesEditForm";

const Page = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const CategoriesApiModel = new CategoriesApi();

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);
  const [isEditing, setIsEditing] = useState(false)
  const editingCategory = () => {
    setIsEditing(true)
  }

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

  console.log(isEditing)

  return (
    <div className="container" style={{ paddingBottom: "2em" }}>
      <CategoriesTable itemsCategories={itemsCategories} getCategories={getCategories} editingCategory={editingCategory} modalOpen={modalOpen} closeModal={closeModal} openModal={openModal}/>

      <GButton text={"Agregar Categoria"} onClick={() => (modalOpen ? closeModal() : openModal())}>
        {" "}
        Abrir
      </GButton>

      <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
        {modalOpen && (

          isEditing ? (
            (<Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <CategoriesEditForm  getCategories={getCategories}/>
            </Modal>)
          ) :
            (<Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <CategoriesForm closeModal={closeModal} getCategories={getCategories} />
            </Modal>)


        )}
      </AnimatePresence>
    </div >
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
