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
import VentasTable from "../components/influencers/VentaTable";

import { Budget } from "../components/dashboard/budget";
// Api
import { TrailersApi } from "../api/TrailersApi";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Fragment } from "react";

const Page = () => {
  const [editAgencia, setEditAgencia] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showSeccion, setShowSeccion] = useState("influencers");
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
    <div className={`container`} style={{ marginBottom: "4em" }}>
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
          my: "2em",
        }}
      >
        <Container maxWidth={true}>
          <Grid container spacing={3}>
            <Grid item lg={4} sm={6} xs={12}>
              <TotalCustomers title={"Total de influencers"} />
            </Grid>

            <Grid item lg={4} sm={6} xl={3} xs={12}>
              <Budget title={"total de ventas"} />
            </Grid>

            <Grid item lg={4} sm={6} xs={12}>
              <TotalProfit title={"total de ganancias"} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          marginBottom: "2em",
          marginTop: "0em",
          display: "flex",
          justifyContent: "center",
          gap: "2%",
        }}
      >
        <GButton text={"VER INFLUENCERS"} secondary onClick={() => setShowSeccion("influencers")} />
        <GButton text={"REGISTRO DE VENTAS"} secondary onClick={() => setShowSeccion("ventas")} />
      </Box>

      {showSeccion === "ventas" && (
        <Fragment>
          <Box sx={{ marginBottom: "3em", marginTop: "3em" }}>
            <h2 style={{ marginBottom: "1em" }}>Regístro de ventas</h2>
            <Box sx={{ display: "flex", alignItems: "flex-end " }}>
              <Box sx={{ display: "flex", flexDirection: "column", marginRight: "2em" }}>
                <label>Desde:</label>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker />
                </LocalizationProvider>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", marginRight: "2em" }}>
                <label>Hasta:</label>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker />
                </LocalizationProvider>
              </Box>
              <Box sx={{ marginRight: "2em" }}>
                <GButton text={"Generar regístro"} onClick={() => false} />
              </Box>
            </Box>
          </Box>

          <h2 style={{ marginBottom: "1rem" }}>Listado de ventas</h2>
          <VentasTable
            editingTrailers={editingTrailers}
            modalOpen={modalOpen}
            closeModal={closeModal}
            openModal={openModal}
            itemsTrailers={itemsTrailers}
            getTrailers={getTrailers}
          />
          <h3 style={{ marginBottom: "1em", textAlign: "right", marginTop: "1em" }}>
            Total: <span style={{ fontSize: "2.5rem", marginLeft: "1rem" }}> $100.000</span>
          </h3>
        </Fragment>
      )}
      {showSeccion === "influencers" && (
        <Fragment>
          <div className="table-header-container">
            <h2 style={{ marginBottom: "1em" }}>Influencers</h2>
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
        </Fragment>
      )}
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
