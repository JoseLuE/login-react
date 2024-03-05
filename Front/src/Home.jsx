import React from 'react';
import './estilos/home.css';
import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div>
      <h1>Bienvenido a la pagina inicial</h1>
      <Link to="login">Login</Link>
      <h1></h1>
      <Link to="register">Register</Link>
    </div>
  );
}

export default Inicio;