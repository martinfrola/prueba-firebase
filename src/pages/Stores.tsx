import React from "react";
import { Outlet, useParams } from "react-router-dom";

export default function Stores() {
  let { idTienda } = useParams();
  console.log(idTienda);

  return (
    <div>
      {idTienda === undefined ? (
        <h1>Stores</h1>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  );
}
