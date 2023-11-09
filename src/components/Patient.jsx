import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";

export const Patient = () => {
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

  // Cargar datos del paciente al montar el componente
  useEffect(() => {
    // Realizar una solicitud al backend para obtener los datos del paciente
    // Utiliza el token almacenado en el localStorage o en otro lugar seguro
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get("http://localhost:3000/actualizar-expediente", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Actualizar el estado con los datos del paciente
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener datos del paciente:", error);
        });
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Realizar una solicitud al backend para actualizar los datos del paciente
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

        // Manejar la respuesta del backend
        setSuccessMessage(response.data.message);
      }
    } catch (error) {
      // Manejar errores al actualizar los datos
      setError("Error al actualizar el expediente médico");
      console.error("Error al actualizar el expediente médico:", error);
    }
  };

  const handleChange = (e) => {
    // Actualizar el estado cuando cambian los campos del formulario
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Actualizar Datos
          </Button>
        </form>
        {error && <Typography variant="body2" color="error" style={{ marginTop: 10 }}>{error}</Typography>}
        {successMessage && <Typography variant="body2" color="success" style={{ marginTop: 10 }}>{successMessage}</Typography>}
      </Paper>
    </Container>
  );
};
