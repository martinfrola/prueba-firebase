import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import {
  Avatar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import dopfy from "../../utils/photos/dopfy.png";
import useWindowDimensions from "../../hooks/screenSizeHook";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import "./header.scss";

export default function Header() {
  const [menuMobile, setMenuMobile] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { height, width } = useWindowDimensions();

  const handleClick = () => {
    setOpen(!open);
  };

  const list = (anchor: string) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "90%",
          margin: "15px auto 0 auto",
        }}
      >
        <Avatar></Avatar>
        <CloseIcon
          sx={{ ":hover": { cursor: "pointer" } }}
          onClick={() => setMenuMobile(false)}
        />
      </Box>
      <List>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary="Categorías" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Remeras" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Camisas" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Camperas" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Sweaters" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton>
          <Link to="tiendas">
            <ListItemText primary="Tiendas" />
          </Link>
        </ListItemButton>
        <ListItemButton>
          <Link to="preguntasfrecuentes">
            <ListItemText primary="Preguntas Frecuentes" />
          </Link>
        </ListItemButton>
        <ListItemButton>
          <Link to="contacto">
            <ListItemText primary="Contáctanos" />
          </Link>
        </ListItemButton>
      </List>
      <Divider />
      <List>
        <ListItemButton sx={{ alignItems: "center" }}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" sx={{ margin: "0 -20px" }} />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box
      className="header-container"
      sx={{ backgroundColor: "secondary.main" }}
    >
      {width > 900 ? (
        <Box className="header">
          <img src={dopfy} alt="" height="" />
          <Avatar></Avatar>
        </Box>
      ) : (
        <Box className="header-mobile">
          <MenuIcon
            color="primary"
            onClick={() => setMenuMobile(true)}
            sx={{ ":hover": { cursor: "pointer" } }}
          />

          <Drawer
            anchor="left"
            open={menuMobile}
            onClose={() => setMenuMobile(false)}
          >
            {list("left")}
          </Drawer>
          <img src={dopfy} alt="" />
        </Box>
      )}
    </Box>
  );
}
