import React from "react";
import { useParams } from "react-router-dom";

export default function SellerProfile() {
  let { idTienda } = useParams();
  console.log("🚀 ~ file: SellerProfile.tsx ~ line 6 ~ SellerProfile ~ idTienda", idTienda)
//TODO: Mostrar info de la tienda, con card para sucursales
  return <div>SellerProfile</div>;
}
