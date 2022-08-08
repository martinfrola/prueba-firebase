import React from "react";
import Carousel from "react-material-ui-carousel";
import { Grid } from "@mui/material";
import carrousel1 from "../../utils/photos/carrousel1.jpg";
import carrousel2 from "../../utils/photos/carrousel2.jpg";
import carrousel3 from "../../utils/photos/carrousel3.jpg";
import "./carrousel.scss";
export default function Carrousel() {
  return (
    <Grid container>
      <Grid xs={12} md={9} sx={{ margin: "0 auto" }}>
        <Carousel index={1}>
          <div className="carrousel-child slide-1">
            <h1>Slide 1</h1>
          </div>
          <div className="carrousel-child slide-2">
            <h1>Slide 2</h1>
          </div>
          <div className="carrousel-child slide-3">
            <h1>Slide 3</h1>
          </div>
        </Carousel>
      </Grid>
    </Grid>
  );
}
