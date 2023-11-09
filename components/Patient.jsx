// Importa React, useState y useEffect para manejar el estado y los efectos secundarios en el ciclo de vida del componente
import { useState, useEffect } from "react";
import axios from "axios";
// Importa componentes de Material-UI para la interfaz de usuario
import { Button, TextField, Typography, Container, Paper } from "@mui/material";

// Componente funcional para la gestión de la información del paciente
export const Patient = () => {
  // Estado local para almacenar los datos del paciente, mensajes de error y mensajes de éxito
  const [userData, setUserData] = useState({
    lugar_de_nacimiento: "",
    sexo: "",
    edad: 0,
    tipo_de_sangre: "",
    peso: 0,
    estatura: 0,
    alergias: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Efecto de useEffect que se ejecuta al montar el componente para cargar los datos del paciente
  useEffect(() => {
    // Realiza una solicitud al backend para obtener los datos del paciente utilizando el token de autenticación
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:3000/actualizar-expediente", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Actualiza el estado local con los datos del paciente obtenidos del backend
          setUserData(response.data);
        })
        .catch((error) => {
          // Maneja los errores al obtener datos del paciente y muestra un mensaje en la consola
          console.error("Error al obtener datos del paciente:", error);
        });
    }
  }, []);

  // Función para manejar la actualización de los datos del paciente
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Realiza una solicitud al backend para actualizar los datos del paciente utilizando el token de autenticación
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.put(
          "http://localhost:3000/actualizar-expediente",
          userData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Maneja la respuesta del backend y muestra un mensaje de éxito
        setSuccessMessage(response.data.message);
      }
    } catch (error) {
      // Maneja los errores al actualizar los datos y muestra un mensaje de error
      setError("Error al actualizar el expediente médico");
      console.error("Error al actualizar el expediente médico:", error);
    }
  };

  // Función para manejar cambios en los campos del formulario y actualizar el estado local
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Renderiza el formulario de actualización de datos del paciente dentro de un contenedor Paper en un contenedor principal
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
        <Typography variant="h4" gutterBottom>
          Actualizar Expediente Médico
        </Typography>
        <form onSubmit={handleUpdate} style={{ width: "100%", marginTop: 20 }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="lugar_de_nacimiento"
            label="Lugar de Nacimiento"
            name="lugar_de_nacimiento"
            autoComplete="lugar_de_nacimiento"
            autoFocus
            value={userData.lugar_de_nacimiento}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="sexo"
            label="Sexo"
            type="text"
            id="sexo"
            autoComplete="sexo"
            value={userData.sexo}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="edad"
            label="Edad"
            type="number"
            id="edad"
            autoComplete="edad"
            value={userData.edad}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="tipo_de_sangre"
            label="Tipo de Sangre"
            type="text"
            id="tipo_de_sangre"
            autoComplete="tipo_de_sangre"
            value={userData.tipo_de_sangre}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="peso"
            label="Peso"
            type="text"
            id="peso"
            autoComplete="peso"
            value={userData.peso}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="estatura"
            label="Estatura"
            type="text"
            id="estatura"
            autoComplete="estatura"
            value={userData.estatura}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="alergias"
            label="Alergias"
            type="text"
            id="alergias"
            autoComplete="alergias"
            value={userData.alergias}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Actualizar Datos
          </Button>
        </form>
        {error && (
          <Typography variant="body2" color="error" style={{ marginTop: 10 }}>
            {error}
          </Typography>
        )}
        {successMessage && (
          <Typography variant="body2" color="success" style={{ marginTop: 10 }}>
            {successMessage}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};
