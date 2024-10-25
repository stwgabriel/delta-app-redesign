"use client";

import { decodeJWT } from "@/utils/funcs";
import { createContext, useContext, useEffect, useState } from "react";

const APIContext = createContext();

export const APIContextProvider = ({ children }) => {
  const baseUrl = "http://localhost:8000";

  const [tokens, _setTokens] = useState({});
  const [isTokensLoaded, setIsTokensLoaded] = useState(false);
  useEffect(() => {
    let savedTokens = localStorage.getItem("tokens");
    if (savedTokens === null || savedTokens === undefined) savedTokens = {};
    else savedTokens = JSON.parse(savedTokens);
    _setTokens(savedTokens);
    setIsTokensLoaded(true);
  }, []);

  function setToken(scope, token) {
    _setTokens((old) => {
      let newTokens = { ...old, [scope]: token };
      localStorage.setItem("tokens", JSON.stringify(newTokens));
      return newTokens;
    });
  }

  function popToken(scope) {
    _setTokens((old) => {
      let newTokens = { ...old };
      if (scope in newTokens) {
        delete newTokens[scope];
      }
      localStorage.setItem("tokens", JSON.stringify(newTokens));
      return newTokens;
    });
  }

  function _getValidToken(scope) {
    return new Promise((resolve, reject) => {
      let token = tokens[scope];
      if (token === undefined) reject(null);
      let decodedToken = decodeJWT(token);
      let valid_to = new Date(decodedToken.valid_to) - 60 * 1000 * 15;
      if (valid_to > new Date()) {
        // More than one minute to expire token
        resolve(token);
      } else {
        // Less than one minute to expire token
        // Refresh token
        const url = "/v1/token/refresh";
        const configs = {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
        _request(url, configs)
          .then((r) => {
            setToken(scope, r["token"]);
            resolve(r["token"]);
          })
          .catch(reject);
      }
    });
  }

  function _request(_url, configs) {
    configs["headers"] = {
      "content-type": "application/json",
      ...configs["headers"],
    };
    const url = `${baseUrl}${_url}`;
    return new Promise((resolve, reject) => {
      fetch(url, configs)
        .then((r) => {
          if (r.ok) {
            r.json().then(resolve);
          } else {
            r.json().then(reject);
          }
        })
        .catch(reject);
    });
  }

  function _authorized_request(_url, configs = {}, scope = null) {
    return new Promise((resolve, reject) => {
      if (scope !== null) {
        _getValidToken(scope)
          .then((token) => {
            let headers = configs["headers"] || {};

            headers["authorization"] =
              headers["authorization"] || `Bearer ${token}`;

            configs["headers"] = headers;

            _request(_url, configs).then(resolve).catch(reject);
          })
          .catch(reject);
      } else {
        _request(_url, configs).then(resolve).catch(reject);
      }
    });
  }

  function _get(_url, configs = {}, scope = null) {
    configs["method"] = "GET";
    return _authorized_request(_url, configs, scope);
  }

  function _post(_url, configs = {}, scope = null) {
    configs["method"] = "POST";
    return _authorized_request(_url, configs, scope);
  }

  function login_consultor(username, password) {
    logout_hospital();
    const url = "/v1/login/consultor";
    const body = JSON.stringify({ username, password });
    const configs = { body };

    return new Promise((resolve, reject) => {
      _post(url, configs)
        .then((r) => {
          setToken("CONSULTOR", r["token"]);
          resolve();
        })
        .catch(reject);
    });
  }

  function login_hospital(username, password) {
    logout_consultor();
    const url = "/v1/login/hospital";
    const body = JSON.stringify({ username, password });
    const configs = { body };

    return new Promise((resolve, reject) => {
      _post(url, configs)
        .then((r) => {
          setToken("HOSPITAL", r["token"]);
          resolve();
        })
        .catch(reject);
    });
  }

  function login_doctor(cpf, crm_number, crm_state) {
    logout_consultor();
    const url = "/v1/login/doctor";
    const body = JSON.stringify({ cpf, crm_state, crm_number });
    const configs = { body };

    return new Promise((resolve, reject) => {
      _post(url, configs, "HOSPITAL")
        .then((r) => {
          setToken("DOCTOR", r["token"]);
          resolve();
        })
        .catch(reject);
    });
  }

  function logout_consultor() {
    popToken("CONSULTOR");
  }

  function logout_hospital() {
    popToken("DOCTOR");
    popToken("HOSPITAL");
  }

  function logout_doctor() {
    popToken("DOCTOR");
  }

  function get_my_charts() {
    const url = "/v1/chart/my";
    const configs = {};
    return new Promise((resolve, reject) => {
      _get(url, configs, "DOCTOR").then(resolve).catch(reject);
    });
  }

  return (
    <APIContext.Provider
      value={{
        login_consultor,
        login_hospital,
        login_doctor,
        logout_consultor,
        logout_hospital,
        logout_doctor,
        isLoggedConsultor: tokens["CONSULTOR"] !== undefined,
        isLoggedHospital: tokens["HOSPITAL"] !== undefined,
        isLoggedDoctor: tokens["DOCTOR"] !== undefined,
        isTokensLoaded,
        get_my_charts,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export const useAPIContext = () => useContext(APIContext);
