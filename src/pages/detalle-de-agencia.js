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
import { useRouter } from "next/router";
import { Budget } from "../components/dashboard/budget";
// Api
import { AgenciaApi } from "../api/AgenciasApi";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Fragment } from "react";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

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

  const AgenciaApiModel = new AgenciaApi();
  const [items, setItem] = useState([]);
  const [info, seInfo] = useState({});
  const [ventas, setVentas] = useState([]);
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);

  const getInfo = async () => {
    const response = await AgenciaApiModel.GetAgencia(id);
    if (response.status === 200) {
      seInfo(response.data);
      setItem(response.data.data.influencer);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const selectDate = (value, name) => {
    const date = new Date(value._d);
    const parseDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
    if (name === "start") {
      setStartDate(parseDate);
    } else {
      setEndDate(parseDate);
    }
  };

  const generateVentas = async () => {
    if (startDate && endDate) {
      const response = await AgenciaApiModel.GetVentas(id, {
        date_inicial: startDate,
        date_final: endDate,
      });
      if (response.status === 200 && Array.isArray(response.data)) {
        setVentas(response.data);
      }
    } else {
      const response = await AgenciaApiModel.GetVentas(id);
      if (response.status === 200 && Array.isArray(response.data)) {
        setVentas(response.data);
      }
    }
  };

  return (
    <div className={`container`} style={{ marginBottom: "4em" }}>
      <Head>
        <title>Ambly CMS - {info?.data?.name_agency}</title>
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

          <h1 className="">{info?.data?.name_agency}</h1>
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
        <Container>
          <Grid container spacing={3}>
            <Grid item lg={4} sm={6} xs={12}>
              <TotalCustomers title={"Total de influencers"} value={info?.totalInfluencer} />
            </Grid>

            <Grid item lg={4} sm={6} xl={3} xs={12}>
              <Budget title={"total de ventas"} />
            </Grid>

            <Grid item lg={4} sm={6} xs={12}>
              <TotalProfit title={"total de ganancias"} value={info?.totalMoney} />
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
        {showSeccion === "influencers" ? (
          <GButton
            text={"VER REGISTRO DE VENTAS"}
            secondary
            onClick={() => setShowSeccion("ventas")}
          />
        ) : (
          <GButton
            text={"VER INFLUENCERS"}
            secondary
            onClick={() => setShowSeccion("influencers")}
          />
        )}
      </Box>

      {showSeccion === "ventas" && (
        <Fragment>
          <Box sx={{ marginBottom: "3em", marginTop: "3em" }}>
            <h2 style={{ marginBottom: "1em" }}>Regístro de ventas</h2>
            <Box sx={{ display: "flex", alignItems: "flex-end " }}>
              <Box sx={{ display: "flex", flexDirection: "column", marginRight: "2em" }}>
                <label>Desde:</label>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker onChange={(value) => selectDate(value, "start")} />
                </LocalizationProvider>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", marginRight: "2em" }}>
                <label>Hasta:</label>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker onChange={(value) => selectDate(value, "end")} />
                </LocalizationProvider>
              </Box>
              <Box sx={{ marginRight: "2em" }}>
                <GButton text={"Generar regístro"} onClick={() => generateVentas()} />
              </Box>
            </Box>
          </Box>

          <h2 style={{ marginBottom: "1rem" }}>Listado de ventas</h2>
          <VentasTable items={ventas} />
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
          {
            <InfluencersTable
              editingTrailers={editingTrailers}
              modalOpen={modalOpen}
              closeModal={closeModal}
              openModal={openModal}
              items={items}
              getInfo={getInfo}
            />
          }
        </Fragment>
      )}
      <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
        {modalOpen &&
          (isEditing.active ? (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <InfluencerEditFrom
                getInfluencer={getInfo}
                closeModal={closeModal}
                isEditing={isEditing.id}
                items={items}
              />
            </Modal>
          ) : (
            <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
              <InfluencerForm closeModal={closeModal} getInfo={getInfo} />
            </Modal>
          ))}
      </AnimatePresence>

      <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
        {editAgencia && (
          <Modal
            modalOpen={editAgencia}
            text={""}
            closeModal={() => setEditAgencia(false)}
            handleClose={() => setEditAgencia(false)}
          >
            <AgenciaEditFrom
              getAgencias={getInfo}
              closeModal={() => setEditAgencia(false)}
              isEditing={info.data.id}
              items={[info.data]}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
