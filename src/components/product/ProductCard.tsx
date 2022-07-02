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
import { ProductCardClass } from "./ProductCard.class";
import "./ProductCard.styled.scss";

const comprar = () => {
  console.log("Comprar");
};
interface Props {
  product: ProductCardClass;
}
export default function ProductCard({ product }: Props) {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={product.image}
            alt="Imagen del producto"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title.slice(0, 20)} {/* Simplificacion para el nombre */}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Avatar
                alt="Remy Sharp"
                src="https://v4.mui.com/static/images/avatar/2.jpg"
              />
              <Typography variant="h5" component="div">
                ${product.price}
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
