"use client";

import { useAuthContext } from "@/contexts/auth";
import { useState } from "react";

export default function AuthLogin() {
  const { authData, setAuthData } = useAuthContext();

  const [hospitalName, setHospitalName] = useState("");
  const [password, setPassword] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorCRM, setDoctorCRM] = useState("");

  function makeLogin() {
    setAuthData({
      hospitalName,
      password,
      doctorName,
      doctorCRM,
    });
  }

  return (
    <section className="justify-content-center">
      <form className="flex-column">
        <span className="align-self-center my-4">Sign In</span>
        <div className="mb-3 flex-column">
          <label>Username do Hospital</label>
          <input
            type="text"
            className="form-control"
            placeholder="HBASE"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
          />
        </div>

        <div className="mb-3 flex-column">
          <label>Senha</label>
          <input
            type="password"
            className="form-control"
            placeholder="Digite a senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3 flex-column">
          <label>Nome</label>
          <input
            type="text"
            className="form-control"
            placeholder="João Silva"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </div>

        <div className="mb-3 flex-column">
          <label>CRM</label>
          <input
            type="text"
            className="form-control"
            placeholder="CRM/SP 123456"
            value={doctorCRM}
            onChange={(e) => setDoctorCRM(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button type="button" className="btn btn-primary" onClick={makeLogin}>
            Sign In
          </button>
        </div>
      </form>
    </section>
  );
}
