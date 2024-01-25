import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";

const Register = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "contraseña") setContraseña(value);
  };

  const handleSubmitRegister = (e) => {
    e.preventDefault();

    auth.register(contraseña, email).then((res) => {
      if (res) {
        setMessage("");
        navigate("/login");
      } else {
        setMessage("¡Algo salió mal!");
      }
    });
  };

  return (
    <div className="register">
      <InfoTooltip></InfoTooltip>
      <p className="register__welcome">Regístrate.</p>
      <form onSubmit={handleSubmitRegister} className="register__form">
        <input
          className="register_input"
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={handleChangeRegister}
          placeholder="Correo Electrónico:"
        />

        <input
          className="register_input"
          id="contraseña-register"
          name="contraseña"
          type="password"
          value={contraseña}
          onChange={handleChangeRegister}
          placeholder="Contraseña"
        />

        <div className="register__button-container">
          <button type="submit" className="register__link">
            Regístrate
          </button>
        </div>
      </form>
      <div className="register__signin">
        <p>¿Ya tienes una cuenta?</p>
        <Link to="/login" className="register__login-link">
          Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
};

export default Register;
