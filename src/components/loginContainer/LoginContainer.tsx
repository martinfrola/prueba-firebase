import React, { useEffect, useState } from "react";
import { app } from "../../services/firebase";
import {
  createUser,
  signIn,
  signInGoogle,
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
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/reducers/userReducer";
export default function LoginContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const dispatchSetUser = (user: Object) =>
    dispatch(
      setUser({
        payload: user,
      })
    );

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
        signInGoogle()
          .then((res) => {
            dispatchSetUser(res);
            navigate("../");
          })
          .catch((res) => console.log(res));
        break;
      case cases.facebook:
        signInFacebook().then(() => navigate("../"));
        break;
      case cases.signIn:
        signIn(loginData.email, loginData.pass)
          .then((res) => {
            dispatchSetUser(res);
            navigate("../");
          })
          .catch((res) => console.log(res));
        break;
      case cases.createUser:
        createUser(loginData.email, loginData.pass).then(() => navigate("../"));
        break;
    }
  };

  return (
    <>
      <button onClick={() => logOut().then(() => navigate("../login"))}>
        Cerrar Sesión
      </button>
      <Typography
        variant="h4"
        sx={{ textAlign: "center", paddingBottom: "40px" }}
      >
        ¡Inicia sesión como prefieras!
      </Typography>
      <Grid
        container
        xl={9}
        sx={{
          margin: "0 auto",
        }}
      >
        <Grid
          item
          lg={4}
          sm={9}
          xs={11}
          sx={{
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
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
            <GoogleIcon sx={{ fontSize: 25 }} />
            <Typography sx={{ padding: "0 0 0 10px" }} variant="body2">
              Iniciar Sesión con Google
            </Typography>
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
            <FacebookIcon sx={{ fontSize: 25 }} />
            <Typography sx={{ padding: "0 0 0 10px" }} variant="body2">
              Iniciar Sesión con Facebook
            </Typography>
          </Button>
        </Grid>

        <Grid
          item
          lg={4}
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
      </Grid>
    </>
  );
}
