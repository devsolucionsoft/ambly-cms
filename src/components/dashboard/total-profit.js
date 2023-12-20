import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

export const TotalProfit = (props) => {
  // Función para formatear el valor como precio colombiano
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0, // Puedes ajustar la cantidad de decimales si es necesario
    }).format(value);
  };

  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {props.title}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {formatCurrency(props.value)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                height: 56,
                width: 56,
              }}
            >
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
