import React, { useState } from "react";
import { Product } from "./Product";
import "./product.styled.scss";

const comprar = () => {
  console.log("Comprar");
};
interface Props {
  product: Product;
}
export default function ProductComponent({ product }: Props) {
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
