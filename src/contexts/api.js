"use client";

import { decodeJWT } from "@/utils/funcs";
import { API_ROUTES, get_api_host } from "@/utils/variables";
import { createContext, useContext, useEffect, useState } from "react";

const APIContext = createContext();

export const APIContextProvider = ({ children }) => {
  const baseUrl = get_api_host();

  const [_token, _setToken] = useState(null);
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);

  useEffect(() => {
    let savedToken = localStorage.getItem("token");
    if (savedToken === null || savedToken === undefined) savedToken = null;
    _setToken(savedToken);
    console.log("Token loaded. Exists?", savedToken ? "yes" : "no");
    setIsTokenLoaded(true);
  }, []);

  useEffect(() => {
    console.log("Token changed");
  }, [_token]);

  function setToken(token) {
    _setToken(token);
    localStorage.setItem("token", token);
  }

  function popToken() {
    localStorage.removeItem("token");
    _setToken(null);
  }

  function getFromToken(itm) {
    if (!_token) return null;
    const decodedToken = decodeJWT(_token);
    return decodedToken[itm];
  }

  function get_my_user_id() {
    return getFromToken("user_id");
  }

  function _getValidToken() {
    return new Promise((resolve, reject) => {
      if (_token === null) reject("No token");
      let decodedToken = decodeJWT(_token);
      let valid_to = new Date(decodedToken.valid_to).getTime() - 60 * 1000 * 1;
      if (valid_to > new Date()) {
        // More than one minute to expire token
        resolve(_token);
      } else {
        // Less than one minute to expire token
        // Refresh token
        const url = API_ROUTES.REFRESH_TOKEN;
        const configs = {
          method: "POST",
          headers: {
            authorization: `Bearer ${_token}`,
          },
        };
        _request(url, configs)
          .then((r) => {
            setToken(r["token"]);
            resolve(r["token"]);
          })
          .catch(reject);
      }
    });
  }

  function _request(_url, configs) {
    configs["headers"] = {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      ...configs["headers"],
    };
    const url = `${baseUrl}${_url}`;

    return new Promise((resolve, reject) => {
      fetch(url, configs)
        .then((r) => {
          if (r.ok) {
            r.json().then(resolve).catch(reject);
          } else {
            r.json().then(reject).catch(reject);
          }
        })
        .catch(reject);
    });
  }

  function _authorized_request(_url, configs = {}) {
    return new Promise((resolve, reject) => {
      _getValidToken()
        .then((token) => {
          let headers = configs["headers"] || {};
          headers["authorization"] = `Bearer ${token}`;
          configs["headers"] = headers;
          _request(_url, configs).then(resolve).catch(reject);
        })
        .catch(reject);
    });
  }

  function _get(_url, configs = {}) {
    configs["method"] = "GET";
    return _authorized_request(_url, configs);
  }

  function _post(_url, configs = {}) {
    configs["method"] = "POST";
    return _authorized_request(_url, configs);
  }

  function login_consultor(username, password) {
    console.log(username);
    const url = API_ROUTES.LOGIN_CONSULTOR;
    const body = JSON.stringify({ username, password });
    const configs = { body, method: "POST" };

    return new Promise((resolve, reject) => {
      _request(url, configs)
        .then((r) => {
          setToken(r["token"]);
          resolve();
        })
        .catch(reject);
    });
  }

  function login_hospital(username, password) {
    const url = API_ROUTES.LOGIN_HOSPITAL;
    const body = JSON.stringify({ username, password });
    const configs = { body, method: "POST" };

    return new Promise((resolve, reject) => {
      _request(url, configs)
        .then((r) => {
          setToken(r["token"]);
          resolve();
        })
        .catch(reject);
    });
  }

  function login_doctor(cpf, crm_number, crm_state) {
    const url = API_ROUTES.LOGIN_DOCTOR;
    const body = JSON.stringify({ cpf, crm_state, crm_number });
    const configs = { body };

    return new Promise((resolve, reject) => {
      _post(url, configs)
        .then((r) => {
          setToken(r["token"]);
          resolve();
        })
        .catch(reject);
    });
  }

  function _logout_doctor() {
    const url = API_ROUTES.LOGOUT_DOCTOR;
    const configs = {};
    return new Promise((resolve, reject) => {
      _post(url, configs)
        .then((r) => {
          setToken(r["token"]);
          resolve();
        })
        .catch(reject);
    });
  }

  function logout() {
    if (_token === null) return;
    const decodedToken = decodeJWT(_token);
    const scope = decodedToken["scope"];
    if (scope !== "DOCTOR") return popToken();
    return _logout_doctor();
  }

  function get_chart(chart_id) {
    const url = `/v1/chart?chart_id=${chart_id}`;
    const configs = {};
    return _get(url, configs);
  }

  function get_chart_chat(chart_id) {
    const url = `/v1/chart/chat?chart_id=${chart_id}`;
    const configs = {};
    return _get(url, configs);
  }

  function post_chart_chat_message(chart_id, message) {
    const url = `/v1/chart/chat/message?chart_id=${chart_id}`;
    const configs = { body: JSON.stringify({ message }) };
    return _post(url, configs);
  }

  function get_charts_by_status(status) {
    const url = `/v1/chart/charts_by_status?status=${status}`;
    const configs = {};
    return _get(url, configs);
  }

  function get_my_charts() {
    const url = `/v1/chart/my`;
    const configs = {};
    return _get(url, configs);
  }

  function chart_update_attributes(chart_id, attributes) {
    const url = `/v1/chart/form/update_attributes?chart_id=${chart_id}`;
    const configs = { body: JSON.stringify(attributes) };
    return _post(url, configs);
  }

  function create_chart() {
    const url = `/v1/chart/create`;
    const configs = {};
    return _post(url, configs);
  }

  function get_nih_template() {
    const url = `/v1/templates/nih`;
    const configs = {};
    return _get(url, configs);
  }

  function create_chart_file(chart_id, fname, ftype) {
    const url = `/v1/file/chart/create_chart_file?chart_id=${chart_id}`;
    const configs = { body: JSON.stringify({ fname, ftype }) };
    console.log(configs);
    return _post(url, configs);
  }

  function complete_file(file_id) {
    const url = `/v1/file/complete_file?file_id=${file_id}`;
    const configs = {};
    return _post(url, configs);
  }

  function get_file(file_id) {
    const url = `/v1/file/get_file?file_id=${file_id}`;
    const configs = {};
    return _get(url, configs);
  }

  function list_chart_files(chart_id) {
    const url = `/v1/file/chart/list_files?chart_id=${chart_id}`;
    const configs = {};
    return _get(url, configs);
  }

  function create_chart_call(chart_id) {
    const url = `/v1/meeting/create?chart_id=${chart_id}`;
    const configs = {};
    return _post(url, configs);
  }

  function add_meeting_attendee(meeting_id) {
    const url = `/v1/meeting/add_attendee?meeting_id=${meeting_id}`;
    const configs = {};
    return _post(url, configs);
  }

  function get_ongoing_meetings(chart_id) {
    const url = `/v1/meeting/get_ongoing_meetings?chart_id=${chart_id}`;
    const configs = {};
    return _get(url, configs);
  }
  return (
    <APIContext.Provider
      value={{
        _token,
        _getValidToken,
        login_consultor,
        login_hospital,
        login_doctor,
        logout,
        isLoggedConsultor: getFromToken("scope") === "CONSULTOR",
        isLoggedHospital: getFromToken("scope") === "HOSPITAL",
        isLoggedDoctor: getFromToken("scope") === "DOCTOR",
        isTokenLoaded,
        get_my_user_id,
        get_my_charts,
        get_chart,
        get_chart_chat,
        post_chart_chat_message,
        get_charts_by_status,
        chart_update_attributes,
        create_chart,
        get_nih_template,
        create_chart_file,
        complete_file,
        get_file,
        list_chart_files,
        create_chart_call,
        add_meeting_attendee,
        get_ongoing_meetings,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export const useAPIContext = () => useContext(APIContext);
