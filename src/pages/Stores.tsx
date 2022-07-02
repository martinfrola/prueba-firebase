import React from "react";
import { Outlet, useParams } from "react-router-dom";

export default function Stores() {
  let { tienda } = useParams();
  console.log(tienda);

  return (
    <div>
      {tienda == undefined ? (
        <h1>Stores</h1>
      ) : (
        <div>
          <Outlet />
        </div>
      )}
    </div>
  );
}
