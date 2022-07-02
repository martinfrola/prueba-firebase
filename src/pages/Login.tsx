import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div>Login</div>
      <p>
        <Link to={"/contacto"}>Ir a contacto</Link>
      </p>
    </>
  );
}
