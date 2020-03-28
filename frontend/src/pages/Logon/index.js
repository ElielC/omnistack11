import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

import LogoImg from "../../assets/logo.svg";
import HeroesImg from "../../assets/heroes.png";

export default function Logon() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await api.post("sessions", { id });

      console.log(res);

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", res.data.name);

      history.push("/profile");
    } catch {
      alert("OPS! Algo deu errado, tente mais tarde");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={LogoImg} alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>

          <input
            placeholder="Sua Id"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button type="submit" className="button">
            Entrar
          </button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={HeroesImg} alt="Heroes" />
    </div>
  );
}
