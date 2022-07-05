import React, { useEffect, useState } from "react";
import { app } from "/Users/Martìn/Desktop/Prueba Firebase/firebase-first/src/services/firebase";
import {
  createUser,
  signIn,
  signInGoogle,
  verifyUser,
  signInFacebook,
  logOut,
} from "../../services/login";
import { LoginData } from "./LoginContainer.class";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import FormGroup from "@mui/material/FormGroup";

export default function LoginContainer() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    pass: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => {
    switch (e?.currentTarget.name) {
      case "google":
        signInGoogle().then(() => navigate("../", { replace: true }));
        break;
      case "facebook":
        signInFacebook().then(() => navigate("../", { replace: true }));
        break;
      case "logIn":
        signIn(loginData.email, loginData.pass).then(() =>
          navigate("../", { replace: true })
        );
        break;
      case "createAcount":
        createUser(loginData.email, loginData.pass).then(() =>
          navigate("../", { replace: true })
        );
        break;
    }
  };

  return (
    <Container>
      <button
        onClick={() =>
          logOut().then(() => navigate("../login", { replace: true }))
        }
      >
        Cerrar Sesión
      </button>
      <Box>
        <Box>
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            name="google"
            onClick={handleLogin}
          >
            Iniciar sesión con Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            name="facebook"
            onClick={handleLogin}
          >
            Iniciar sesión con Facebook
          </Button>
        </Box>
        <FormGroup>
          <TextField
            required
            name="email"
            type="email"
            label="Email"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            required
            name="pass"
            type="password"
            label="Contraseña"
            fullWidth
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="secondary"
            name="logIn"
            onClick={handleLogin}
          >
            Iniciar sesión
          </Button>
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            onClick={handleLogin}
            name="createAcount"
          >
            Crear Cuenta
          </Button>
        </FormGroup>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2" color="secondary">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" color="secondary">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
