import React, { useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Container, Paper } from "@mui/material";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Enviar datos de inicio de sesión al backend
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

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, display: "flex", flexDirection: "column", alignItems: "center" }}>
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Iniciar sesión
          </Button>
        </form>
        {error && <Typography variant="body2" color="error" style={{ marginTop: 10 }}>{error}</Typography>}
      </Paper>
    </Container>
  );
};
