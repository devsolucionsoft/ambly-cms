import { useState, useEffect, Fragment } from "react";
import { DashboardLayout } from "../components/dashboard-layout";
import Image from "next/image";
import GButton from "../components/buttons/GButton";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../components/modal/Modal";
import InfluencerEditFromIndividual from "../components/influencers/InfluencerEditFromIndividual";
import VentasTable from "../components/influencers/VentaTable";
import { Budget } from "../components/dashboard/budget";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Head from "next/head";
// Api
import { InfluencersApi } from "../api/InfluencersApi";
import { Box, Container, Grid } from "@mui/material";
import { TotalProfit } from "../components/dashboard/total-profit";
import { useRouter } from "next/router";
import moment from "moment";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);
  const [defaultStartDate, setDefaultStartDate] = useState(moment());
  const InfluencersApiModel = new InfluencersApi();
  const [infoInfluencer, setInfoInfluencer] = useState(false);
  const [ventas, setVentas] = useState([]);
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const [defaultEndDate, setDefaultEndDate] = useState(moment());
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [loader, setLoader] = useState(false);


  const getInfluencer = async () => {
    const response = await InfluencersApiModel.GetInfluencer(id);
    generateVentas();
    if (response.status === 200) {
      setInfoInfluencer(response.data.data);
      setTotalEarnings(response.data.total_earnings);
      setTotalSales(response.data.total_sales);
    }
  };

  useEffect(() => {
    getInfluencer();
    const firstDayOfMonth = moment().startOf("month");
    setDefaultStartDate(firstDayOfMonth);
    setDefaultEndDate(moment());
  }, []);

  const selectDate = (value, name) => {
    const date = new Date(value._d);
    const parseDate = moment(date).format("YYYY-MM-DD");
    if (name === "start") {
      setStartDate(parseDate);
    } else {
      setEndDate(parseDate);
    }
  };

  const generateVentas = async () => {
    setLoader(true)
    const startDateToSend = startDate ? startDate : defaultStartDate.format("YYYY-MM-DD");
    const endDateToSend = endDate ? endDate : defaultEndDate.format("YYYY-MM-DD");

    const response = await InfluencersApiModel.GetVentas({
      date_inicial: startDateToSend,
      date_final: endDateToSend,
    });
    console.log(response);

    if (response.status === 200 && Array.isArray(response.data.data.sales)) {
      setVentas(response.data.data.sales);
      setTotalSales(response.data.data.sales.length);
      setTotalEarnings(response.data.data.total_commission);
    }
    setLoader(false)
  };

  return (
    <div className={`container`}>
      <Head>
        <title>Ambly CMS - Influencers</title>
      </Head>
      {infoInfluencer && (
        <Fragment>
          <div style={{ display: "flex", gap: "5%", margin: "3em 0", alignItems: "center" }}>
            <div>
              <p style={{}}>
                <b>{infoInfluencer.code_influencer}</b> - {infoInfluencer?.email}
              </p>
              <h1 style={{ marginBottom: "5px" }}>{infoInfluencer?.name_influencer}</h1>
            </div>
            {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <GButton text={"Editar datos"} onClick={openModal}>
                {" "}
                Abrir
              </GButton>
            </div> */}
          </div>
          <Box sx={{ marginBottom: "0em", marginTop: "3em" }}>
            <h2 style={{ marginBottom: "1em" }}>Regístro de ventas</h2>
            <Box sx={{ display: "flex", alignItems: "center", flexWrap : 'wrap', justifyContent : 'center' }}>
              <Box sx={{ display: "flex", flexDirection: "column", marginRight: "2em" }}>
                <label>Desde:</label>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    value={defaultStartDate}
                    onChange={(value) => selectDate(value, "start")}
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", marginRight: "2em" }}>
                <label>Hasta:</label>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    value={defaultEndDate}
                    onChange={(value) => selectDate(value, "end")}
                  />
                </LocalizationProvider>
              </Box>
              <Box sx={{ marginRight: "2em", minWidth : 100 }}>
                <GButton text={loader ? "Cargando..." : "Generar registro"} onClick={() => generateVentas()} />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              py: "3em",
            }}
          >
            <VentasTable items={ventas} />
          </Box>

          <Box
            component="main"
            sx={{
              flexGrow: 1,
            }}
          >
            <Container maxWidth={true}>
              <Grid container spacing={3}>
                <Grid item lg={6} sm={6} xl={3} xs={12}>
                  <Budget title={"total de ventas"} value={totalSales} />
                </Grid>

                <Grid item lg={6} sm={6} xs={12}>
                  <TotalProfit title={"total de ganancias"} value={totalEarnings} />
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Fragment>
      )}

      <AnimatePresence initial={false} mode={"wait"} onExitComplete={() => null}>
        {modalOpen && (
          <Modal modalOpen={modalOpen} text={""} closeModal={closeModal} handleClose={closeModal}>
            <InfluencerEditFromIndividual
              getInfluencer={getInfluencer}
              closeModal={closeModal}
              isEditing={infoInfluencer.id}
              info={infoInfluencer}
            />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
