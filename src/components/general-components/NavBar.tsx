import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
export default function NavBar() {
  const [open, setOpen] = useState<boolean>(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Grid container sx={{ marginBottom: "30px" }}>
      <Grid
        md={9}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 auto",
          backgroundColor: "primary.dark",
        }}
      >
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
        </List>
      </Grid>
    </Grid>
  );
}
