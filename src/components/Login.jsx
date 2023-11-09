// Importa useState y axios para manejar el estado y realizar solicitudes HTTP
import { useState } from "react";
import axios from "axios";
// Importa componentes de Material-UI para la interfaz de usuario
import { Button, TextField, Typography, Container, Paper } from "@mui/material";

// Configura las cabeceras de axios para permitir solicitudes desde cualquier origen
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

// Componente funcional para la página de inicio de sesión
export const Login = () => {
  // Estados locales para almacenar el nombre de usuario, contraseña y mensajes de error
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Función para manejar el envío del formulario de inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Enviar datos de inicio de sesión al backend utilizando axios
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      // Resto del código: manejar la respuesta del backend
      const { message, token } = response.data;
      console.log(message);
      console.log("Token:", token);
      // Almacenar el token en localStorage
      localStorage.setItem("token", token);
    } catch (error) {
      // Manejar errores de inicio de sesión
      setError("Credenciales incorrectas");
      console.error("Error de inicio de sesión:", error);
    }
  };

  // Renderiza el formulario de inicio de sesión dentro de un contenedor Paper en un contenedor principal
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
          Iniciar sesión
        </Typography>
        <form onSubmit={handleLogin} style={{ width: "100%", marginTop: 20 }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar sesión
          </Button>
        </form>
        {error && (
          <Typography variant="body2" color="error" style={{ marginTop: 10 }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};
