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
    console.debug("Token loaded. Exists?", savedToken ? "yes" : "no");
    setIsTokenLoaded(true);
  }, []);

  useEffect(() => {
    console.debug("Token changed");
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
      if (_token === null) {
        console.warn("No token");
        return reject({ message: "No token" });
      }
      let decodedToken = decodeJWT(_token);
      let valid_to = new Date(decodedToken.valid_to).getTime() - 60 * 1000;
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

  function _patch(_url, configs = {}) {
    configs["method"] = "PATCH";
    return _authorized_request(_url, configs);
  }

  function _put(_url, configs = {}) {
    configs["method"] = "PUT";
    return _authorized_request(_url, configs);
  }

  function _post(_url, configs = {}) {
    configs["method"] = "POST";
    return _authorized_request(_url, configs);
  }

  function signup_consultor(userData) {
    const url = API_ROUTES.SIGNUP_CONSULTOR;
    const body = JSON.stringify(userData);
    const configs = { body, method: "POST" };

    return new Promise((resolve, reject) => {
      _request(url, configs).then(resolve).catch(reject);
    });
  }

  function login_consultor(email, password) {
    const url = API_ROUTES.LOGIN_CONSULTOR;
    const body = JSON.stringify({ email, password });
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

  function get_my_charts(status) {
    const url = `/v1/chart/my?${new URLSearchParams({ status }).toString()}`;
    const configs = {};
    return _get(url, configs);
  }

  function chart_update_attributes(chart_id, attributes) {
    const url = `/v1/chart/update_attributes?chart_id=${chart_id}`;
    const configs = { body: JSON.stringify(attributes) };
    return _post(url, configs);
  }

  function create_chart(type, subtype) {
    const url = `/v1/chart/create`;
    const body = { type };
    if (subtype) {
      body["subtype"] = subtype;
    }
    const configs = { body: JSON.stringify(body) };
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

  function list_hospitals() {
    const url = `/v1/admin/list_hospital`;
    const configs = {};
    return _get(url, configs);
  }

  function change_hospital(hospitalChanges) {
    const url = `/v1/admin/hospital/change`;
    const configs = { body: JSON.stringify(hospitalChanges) };
    return _patch(url, configs);
  }

  function list_users() {
    const url = `/v1/admin/list_user`;
    const configs = {};
    return _get(url, configs);
  }

  function change_user(data) {
    const url = `/v1/admin/change_user`;
    const configs = { body: JSON.stringify(data) };
    return _put(url, configs);
  }

  function get_me() {
    const url = `/v1/user/me`;
    const configs = {};
    return _get(url, configs);
  }

  function put_me(data) {
    const url = `/v1/user/me`;
    const configs = { body: JSON.stringify(data) };
    return _put(url, configs);
  }

  function get_hospital() {
    const url = `/v1/hospital/me`;
    const configs = {};
    return _get(url, configs);
  }

  function put_hospital(data) {
    const url = `/v1/hospital/me`;
    const configs = { body: JSON.stringify(data) };
    return _put(url, configs);
  }

  function create_hospital(data) {
    const url = "/v1/admin/hospital/create";
    const body = JSON.stringify(data);
    const configs = { body };
    return _post(url, configs);
  }

  function list_shifts_on_timespan(start, end) {
    const url = `/v1/shift/timespan?start=${start}&end=${end}`;
    const configs = {};
    return _get(url, configs);
  }

  function list_active_consultor() {
    const url = `/v1/user/list/active_consultor`;
    const configs = {};
    return _get(url, configs);
  }

  function search_user_name(name) {
    const url = `/v1/user/search?name=${name}`;
    const configs = {};
    return _get(url, configs);
  }

  function get_user(user_id) {
    const url = `/v1/user?user_id=${user_id}`;
    const configs = {};
    return _get(url, configs);
  }

  function request_delete_shift(shift_id) {
    const url = `/v1/shift/request_delete?shift_id=${shift_id}`;
    const configs = {};
    return _put(url, configs);
  }

  function create_shift(data) {
    const url = `/v1/shift`;
    const body = JSON.stringify(data);
    const configs = { body };
    return _post(url, configs);
  }

  function approve_shift(shift_id) {
    const url = `/v1/shift/approve?shift_id=${shift_id}`;
    const configs = {};
    return _put(url, configs);
  }

  function search_chart(field_type, field_text) {
    const url = `/v1/chart/search`;
    const body = JSON.stringify({ [field_type]: field_text });
    const configs = { body };
    return _post(url, configs);
  }

  function search_user(field_type, field_text) {
    const url = `/v1/user/search`;
    const body = JSON.stringify({ [field_type]: field_text });
    const configs = { body };
    return _post(url, configs);
  }

  function search_hospital(field_type, field_text) {
    const url = `/v1/hospital/search`;
    const body = JSON.stringify({ [field_type]: field_text });
    const configs = { body };
    return _post(url, configs);
  }
  function get_hospital_by_id(hospital_id) {
    const url = `/v1/admin/hospital?hospital_id=${hospital_id}`;
    const configs = {};
    return _get(url, configs);
  }

  return (
    <APIContext.Provider
      value={{
        _token,
        _getValidToken,
        signup_consultor,
        login_consultor,
        login_hospital,
        login_doctor,
        logout,
        isLoggedConsultor: getFromToken("scope") === "CONSULTOR",
        isLoggedHospital: getFromToken("scope") === "HOSPITAL",
        isLoggedDoctor: getFromToken("scope") === "DOCTOR",
        isAdmin: getFromToken("is_admin"),
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
        list_hospitals,
        change_hospital,
        list_users,
        change_user,
        get_me,
        put_me,
        get_hospital,
        put_hospital,
        create_hospital,
        list_shifts_on_timespan,
        list_active_consultor,
        search_user_name,
        get_user,
        request_delete_shift,
        create_shift,
        approve_shift,
        search_chart,
        search_user,
        search_hospital,
        get_hospital_by_id,
      }}
    >
      {children}
    </APIContext.Provider>
  );
};

export const useAPIContext = () => useContext(APIContext);
