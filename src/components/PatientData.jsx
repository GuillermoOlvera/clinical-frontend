import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export const PatientData = () => {
  const [patientData, setPatientData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const getPatientData = async () => {
        try {
          const response = await axios.get("http://localhost:3000/getPatientData", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPatientData(response.data);
        } catch (error) {
          setError("Error al obtener datos del paciente");
          console.error("Error al obtener datos del paciente:", error);
        }
      };

      getPatientData();
    } else {
      setError("Debes iniciar sesión para ver los datos del paciente");
    }
  }, []);

  const handleUpdatePatientData = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await axios.get("http://localhost:3000/getPatientData", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPatientData(response.data);
      } catch (error) {
        setError("Error al obtener datos actualizados del paciente");
        console.error("Error al obtener datos actualizados del paciente:", error);
      }
    }
  };

  const getImcMessage = () => {
    const imc = parseFloat(patientData.imc);

    if (imc < 18.5) {
      return "Bajo peso";
    } else if (imc >= 18.5 && imc < 24.9) {
      return "Peso normal";
    } else if (imc >= 25 && imc < 29.9) {
      return "Sobrepeso";
    } else if (imc >= 30 && imc < 34.9) {
      return "Obesidad";
    } else {
      return "IMC fuera de rango";
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
        {error ? (
          <Typography variant="body2" color="error" style={{ marginBottom: 20 }}>{error}</Typography>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              Datos del Paciente
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary={`Lugar de Nacimiento: ${patientData.lugar_de_nacimiento}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Sexo: ${patientData.sexo}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Edad: ${patientData.edad}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Tipo de Sangre: ${patientData.tipo_de_sangre}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Peso: ${patientData.peso}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Estatura: ${patientData.estatura}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Alergias: ${patientData.alergias}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`IMC: ${patientData.imc}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Mensaje IMC: ${getImcMessage()}`} />
              </ListItem>
            </List>
            <Button onClick={handleUpdatePatientData} variant="contained" style={{ marginTop: 20 }}>
              Actualizar Datos del Paciente
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};
