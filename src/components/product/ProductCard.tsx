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
      <div className="App">
        <button onClick={comprar}>Comprar</button>
        <h3>$5500</h3>
        <h4>{product.price}</h4>
      </div>
    </>
  );
}
