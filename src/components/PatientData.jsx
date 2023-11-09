// Importa useState, useEffect y componentes de Material-UI para manejar el estado y la interfaz de usuario
import { useState, useEffect } from "react";
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

// Componente funcional para mostrar y actualizar los datos del paciente
export const PatientData = () => {
  // Estado local para almacenar los datos del paciente y mensajes de error
  const [patientData, setPatientData] = useState({});
  const [error, setError] = useState(null);

  // Efecto de useEffect que se ejecuta al montar el componente para cargar los datos del paciente
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Obtiene el token de autenticación almacenado en localStorage
    if (token) {
      const getPatientData = async () => {
        try {
          // Realiza una solicitud al backend para obtener los datos del paciente usando el token
          const response = await axios.get(
            "http://localhost:3000/getPatientData",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // Actualiza el estado local con los datos del paciente obtenidos del backend
          setPatientData(response.data);
        } catch (error) {
          setError("Error al obtener datos del paciente");
          console.error("Error al obtener datos del paciente:", error);
        }
      };
      // Llama a la función para obtener los datos del paciente
      getPatientData();
    } else {
      // Muestra un mensaje de error si no hay token, es decir, el usuario no ha iniciado sesión
      setError("Debes iniciar sesión para ver los datos del paciente");
    }
  }, []);

  // Función para manejar la actualización de los datos del paciente
  const handleUpdatePatientData = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Realiza una solicitud al backend para obtener datos actualizados del paciente utilizando el token
        const response = await axios.get(
          "http://localhost:3000/getPatientData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Actualiza el estado local con los datos actualizados del paciente obtenidos del backend
        setPatientData(response.data);
      } catch (error) {
        // Maneja los errores al obtener datos actualizados del paciente y muestra un mensaje en la consola
        setError("Error al obtener datos actualizados del paciente");
        console.error(
          "Error al obtener datos actualizados del paciente:",
          error
        );
      }
    }
  };

  // Función para obtener un mensaje correspondiente al índice de masa corporal (IMC) del paciente
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

  // Renderiza la interfaz de usuario con los datos del paciente y botón para actualizar
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error ? (
          <Typography
            variant="body2"
            color="error"
            style={{ marginBottom: 20 }}
          >
            {error}
          </Typography>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              Datos del Paciente
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary={`Lugar de Nacimiento: ${patientData.lugar_de_nacimiento}`}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Sexo: ${patientData.sexo}`} />
              </ListItem>
              <ListItem>
                <ListItemText primary={`Edad: ${patientData.edad}`} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary={`Tipo de Sangre: ${patientData.tipo_de_sangre}`}
                />
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
            <Button
              onClick={handleUpdatePatientData}
              variant="contained"
              style={{ marginTop: 20 }}
            >
              Actualizar Datos del Paciente
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};
