// Importa los módulos necesarios de React, axios y MUI (Material-UI)
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Typography,
  Container,
  Paper,
  TextField,
  List,
  ListItem,
} from "@mui/material";

// Componente funcional BeneficiariesForm que maneja el formulario y la lista de beneficiarios
export const BeneficiariesForm = () => {
  // Estado local para el nombre, edad, relación, lista de beneficiarios y errores
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [relacion, setRelacion] = useState("");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [error, setError] = useState(null);

  // Función asincrónica para obtener la lista de beneficiarios desde el servidor
  const fetchBeneficiaries = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const response = await axios.get(
          "http://localhost:3000/getBeneficiaries",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBeneficiaries(response.data);
      } catch (error) {
        console.error("Error al obtener beneficiarios:", error);
      }
    }
  };

  // Efecto de useEffect que se ejecuta una vez al montar el componente para cargar la lista inicial de beneficiarios
  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  // Función para manejar la adición de un nuevo beneficiario
  const handleAddBeneficiary = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Envía una solicitud POST para agregar un beneficiario al servidor
        await axios.post(
          "http://localhost:3000/agregar-beneficiario",
          {
            nombre,
            edad,
            relacion,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Actualiza la lista de beneficiarios después de la adición exitosa
        fetchBeneficiaries();
      } catch (error) {
        setError("Error al agregar beneficiario");
        console.error("Error al agregar beneficiario:", error);
      }
    }
  };

  // Función para manejar la eliminación de un beneficiario existente
  const handleDeleteBeneficiary = async (beneficiaryId) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        // Envía una solicitud DELETE para eliminar un beneficiario del servidor
        await axios.delete(
          `http://localhost:3000/eliminar-beneficiario/${beneficiaryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Actualiza la lista de beneficiarios después de la eliminación exitosa
        fetchBeneficiaries();
      } catch (error) {
        setError("Error al eliminar beneficiario");
        console.error("Error al eliminar beneficiario:", error);
      }
    }
  };

  // Renderiza el formulario y la lista de beneficiarios en un contenedor Paper dentro de un contenedor principal
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
          Beneficiarios
        </Typography>
        <form
          onSubmit={handleAddBeneficiary}
          style={{ width: "100%", marginBottom: 20 }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Edad"
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Relación"
            value={relacion}
            onChange={(e) => setRelacion(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Agregar Beneficiario
          </Button>
        </form>
        {error && (
          <Typography
            variant="body2"
            color="error"
            style={{ marginBottom: 20 }}
          >
            {error}
          </Typography>
        )}

        {localStorage.getItem("token") ? (
          <div style={{ width: "100%" }}>
            <Typography variant="h5" gutterBottom>
              Lista de Beneficiarios
            </Typography>
            <List>
              {beneficiaries.map((beneficiary) => (
                <ListItem key={beneficiary.id}>
                  {beneficiary.nombre} - Edad: {beneficiary.edad} - Relación:{" "}
                  {beneficiary.relacion}{" "}
                  <Button
                    onClick={() => handleDeleteBeneficiary(beneficiary.id)}
                    color="secondary"
                  >
                    Eliminar
                  </Button>
                </ListItem>
              ))}
            </List>
          </div>
        ) : (
          <Typography variant="body2" color="error" style={{ marginTop: 20 }}>
            Debes iniciar sesión para ver la lista de beneficiarios.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};
