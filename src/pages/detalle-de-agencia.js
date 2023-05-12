import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import { AnimatePresence, motion } from "framer-motion";
import GButton from "../components/buttons/GButton";
import Modal from "../components/modal/Modal";
import InfluencersTable from "../components/influencers/InfluencerTable";
import InfluencerForm from "../components/influencers/InfluencerForm";
import AgenciaEditFrom from "../components/agencias/AgenciaEditFrom";
import InfluencerEditFrom from "../components/influencers/InfluencerEditFrom";
import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";
import Image from "next/image";
// Api
import { TrailersApi } from "../api/TrailersApi";

const Page = () => {
  const [editAgencia, setEditAgencia] = useState(false);
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
        <title>Ambly CMS - Nombre de agencia</title>
      </Head>

      <div className="table-header-container" style={{ margin: "2em 0" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              position: "relative",
              width: "80px",
              borderRadius: "100%",
              overflow: "hidden",
              height: "80px",
              marginRight: "1rem",
            }}
          >
            <Image
              objectFit="cover"
              alt="Picture of the author"
              layout="fill"
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ThYqss0qn9ybB2R1JMG3GfiaMzIYilMVvg&usqp=CAU"
              }
            />
          </div>

          <h1 className="">Nombre de agencia</h1>
        </div>
        <GButton text={"Editar agencia"} onClick={() => setEditAgencia(true)}>
          {" "}
          Abrir
        </GButton>
      </div>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth={true}>
          <Grid container spacing={3}>
            <Grid item lg={6} sm={6} xs={12}>
              <TotalCustomers title={"Total de influencers"} />
            </Grid>

            <Grid item lg={6} sm={6} xs={12}>
              <TotalProfit title={"total de ventas"} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <div className="table-header-container">
        <div></div>
        <GButton
          text={"Agregar Influencer"}
          onClick={() => (modalOpen ? closeModal() : openModal(), stopEditingTrailers())}
        >
          {" "}
          Abrir
        </GButton>
      </div>
      <InfluencersTable
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
              <InfluencerEditFrom
                getTrailers={getTrailers}
                closeModal={closeModal}
                isEditing={isEditing.id}
                itemsTrailers={itemsTrailers}
              />
            </Modal>
          ) : (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <InfluencerForm closeModal={closeModal} getTrailers={getTrailers} />
            </Modal>
          ))}
      </AnimatePresence>

      <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
        {editAgencia && (
          <Modal
            modalOpen={editAgencia}
            text={""}
            closeModal={closeModal}
            handleClose={() => setEditAgencia(false)}
          >
            <AgenciaEditFrom
              getTrailers={getTrailers}
              closeModal={closeModal}
              isEditing={isEditing.id}
              itemsTrailers={itemsTrailers}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
