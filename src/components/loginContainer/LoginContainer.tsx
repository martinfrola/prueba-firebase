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
import {
  Stack,
  FormGroup,
  Link,
  Grid,
  Button,
  TextField,
  Box,
  Container,
} from "@mui/material";
import { margin, padding } from "@mui/system";

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
  enum cases {
    google = "google",
    facebook = "facebook",
    signIn = "signIn",
    createUser = "createAcount",
  }
  const handleLogin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined
  ) => {
    switch (e?.currentTarget.name) {
      case cases.google:
        signInGoogle().then(() => navigate("../", { replace: true }));
        break;
      case cases.facebook:
        signInFacebook().then(() => navigate("../", { replace: true }));
        break;
      case cases.signIn:
        signIn(loginData.email, loginData.pass)
          .then((res) => {
            navigate("../");
          })
          .catch((res) => console.log(res));
        break;
      case cases.createUser:
        createUser(loginData.email, loginData.pass).then(() =>
          navigate("../", { replace: true })
        );
        break;
    }
  };

  return (
    <>
      <button
        onClick={() =>
          logOut().then(() => navigate("../login", { replace: true }))
        }
      >
        Cerrar Sesión
      </button>
      <Grid
        container
        sx={{
          margin: "0 auto",
          gap: "50px",
        }}
      >
        <Grid
          item
          lg={7}
          sm={9}
          xs={11}
          sx={{
            margin: "0 auto",
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            name="google"
            onClick={handleLogin}
            sx={{
              margin: "0 0 20px 0",
            }}
          >
            Iniciar sesión con Google
          </Button>
          <Button
            variant="outlined"
            fullWidth
            color="secondary"
            name="facebook"
            onClick={handleLogin}
            sx={{
              margin: "0 0 20px 0",
            }}
          >
            Iniciar sesión con Facebook
          </Button>
        </Grid>
        <Grid
          item
          lg={7}
          sm={9}
          xs={11}
          sx={{
            margin: "0 auto",
          }}
        >
          <TextField
            required
            name="email"
            type="email"
            label="Email"
            fullWidth
            onChange={handleChange}
            sx={{
              margin: "0 0 10px 0",
            }}
          />
          <TextField
            required
            name="pass"
            type="password"
            label="Contraseña"
            fullWidth
            onChange={handleChange}
            sx={{
              margin: "0 0 30px 0",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="secondary"
            name="signIn"
            onClick={handleLogin}
            sx={{
              margin: "0 0 30px 0",
            }}
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
        </Grid>

        <Grid
          item
          lg={7}
          sm={9}
          xs={11}
          sx={{
            margin: "0 auto",
            paddingTop: 0,
          }}
        >
          <Link href="#" variant="body2" color="secondary">
            Forgot password?
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
