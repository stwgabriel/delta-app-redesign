"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authInstituicao, setAuthInstituicao] = useState(null);
  const [authUsuario, setAuthUsuario] = useState(null);
  const [loadedAuthUsuario, setLoadedAuthUsuario] = useState(false);
  const [loadedAuthInstituicao, setLoadedAuthInstituicao] = useState(false);

  useEffect(() => {
    const inst = localStorage.getItem("auth_instituicao");
    if (inst === undefined) {
      setLoadedAuthInstituicao(true);
      return;
    }
    setAuthInstituicao(JSON.parse(inst));
    setLoadedAuthInstituicao(true);
  }, []);

  function loginInstituicao(username, password) {
    const login = {
      username,
      password,
    };
    setAuthInstituicao(login);
    localStorage.setItem("auth_instituicao", JSON.stringify(login));
  }

  function logoutInstituicao() {
    setAuthInstituicao(null);
    localStorage.removeItem("auth_instituicao");
  }

  useEffect(() => {
    const user = localStorage.getItem("auth_usuario");
    if (user === undefined) {
      setLoadedAuthUsuario(true);
      return;
    }
    setAuthUsuario(JSON.parse(user));
    setLoadedAuthUsuario(true);
  }, []);

  function loginUsuario(cpf, crm_uf, crm_number) {
    const login = {
      cpf,
      crm_uf,
      crm_number,
    };
    setAuthUsuario(login);
    localStorage.setItem("auth_usuario", JSON.stringify(login));
  }

  function logoutUsuario() {
    setAuthUsuario(null);
    localStorage.removeItem("auth_usuario");
  }

  return (
    <AuthContext.Provider
      value={{
        loginInstituicao,
        authInstituicao,
        loginUsuario,
        authUsuario,
        logoutUsuario,
        logoutInstituicao,
        loadedAuthUsuario,
        loadedAuthInstituicao,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
