import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import Image from "next/image";
import GButton from "../components/buttons/GButton";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../components/modal/Modal";
import InfluencerEditFrom from "../components/influencers/InfluencerEditFrom";

import Head from "next/head";
// Api
import { TrailersApi } from "../api/TrailersApi";
import { Box, Container, Grid } from "@mui/material";
import { TotalCustomers } from "../components/dashboard/total-customers";
import { TotalProfit } from "../components/dashboard/total-profit";

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
        <title>Ambly CMS - Influencers</title>
      </Head>

      <div style={{ display: "flex", gap: "5%", margin: "3em 0", alignItems: "center" }}>
        <Image
          objectFit="cover"
          alt="Picture of the author"
          width={"200px"}
          height={"200px"}
          style={{ borderRadius: "100%" }}
          src={
            "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
          }
        />

        <div style={{}}>
          <h1 style={{ marginBottom: "5px" }}>Nombre influencer</h1>

          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>

          <ul style={{ marginTop: "1rem " }}>
            <li>
              <b>Info</b>: Lorem Ipsum is simply
            </li>
            <li>
              <b>Info</b>: Lorem Ipsum is simply
            </li>
            <li>
              <b>Info</b>: Lorem Ipsum is simply
            </li>
          </ul>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <GButton text={"Editar datos"} onClick={openModal}>
              {" "}
              Abrir
            </GButton>
          </div>
        </div>
      </div>

      <div className="table-header-container" style={{ margin: "2em 0" }}>
        <div style={{ display: "flex", alignItems: "center" }}></div>
      </div>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth={true}>
          <Grid container spacing={3}>
            {/* <Grid item lg={6} sm={6} xs={12}>
              <TotalCustomers title={"Total de influencers"} />
            </Grid> */}

            <Grid item lg={6} sm={6} xs={12}>
              <TotalProfit title={"total de ventas"} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
        {modalOpen && (
          <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
            <InfluencerEditFrom
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
