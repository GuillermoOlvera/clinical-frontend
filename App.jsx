// Importa los componentes necesarios de React y Material-UI, así como los estilos de makeStyles
import { BeneficiariesForm } from "./components/Beneficiary";
import { Login } from "./components/Login";
import { Patient } from "./components/Patient";
import { PatientData } from "./components/PatientData";
import { Container, CssBaseline, Paper, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

// Define estilos personalizados con makeStyles
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "100%",
    maxWidth: 400,
  },
}));

// Componente principal de la aplicación
const App = () => {
  // Utiliza los estilos definidos con makeStyles
  const classes = useStyles();

  // Renderiza la interfaz de usuario con varios componentes, como Login, Patient, PatientData y BeneficiariesForm
  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <Paper elevation={3} className={classes.paper}>
        <Login />
      </Paper>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h5" align="center" gutterBottom>
          Expediente Médico
        </Typography>
        <Patient />
        <PatientData />
      </Paper>
      <Paper elevation={3} className={classes.paper}>
        <BeneficiariesForm />
      </Paper>
    </Container>
  );
};

export default App;
