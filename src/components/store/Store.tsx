import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { StoreClass } from "../../models/Store.class";

interface Props {
  store: StoreClass;
}
export default function StoreCard({ store }: Props) {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={store.imgUrl}
            alt="Imagen de la tienda"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {store.name}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            ></Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
