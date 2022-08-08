import React from "react";
import { Paper, InputBase, IconButton, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid
        md={6}
        xs={9}
        sx={{
          display: "flex",
          justifyContent: "center",
          margin: "15px auto",
        }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <IconButton
            type="submit"
            sx={{ paddingTop: "5px" }}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Buscá un producto o una tienda..."
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
