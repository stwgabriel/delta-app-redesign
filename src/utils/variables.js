export function get_api_host() {
  return "http://localhost:8000";
  // return "http://mylocaldbalex.duckdns.org:8000";
}
export function get_socket_host() {
  return "wss://i2751iwn1e.execute-api.us-east-1.amazonaws.com/production";
}

export const ROUTES = {
  // Home
  HOME: "/",
  // Logins
  LOGIN_HOSPITAL: "/login/hospital",
  LOGIN_DOCTOR: "/login/doctor",
  LOGIN_CONSULTOR: "/login/consultor",
  //Landing pages
  LANDING_PAGE_DOCTOR: "/doctor/overview",
  LANDING_PAGE_CONSULTOR: "/overview/consultor",
  // Prontuário
  PRONTUARIO: "/prontuario/overview",
  PRONTUARIO_PAG0: "/doctor/form/pag0",
  PRONTUARIO_PAG1: "/doctor/form/pag1",
  PRONTUARIO_PAG2: "/doctor/form/pag2",
  PRONTUARIO_PAG3: "/doctor/form/pag3",
};

export const API_ROUTES = {
  // Auth
  REFRESH_TOKEN: "/v1/auth/refresh_token",
  LOGIN_CONSULTOR: "/v1/auth/login/consultor",
  LOGIN_HOSPITAL: "/v1/auth/login/hospital",
  LOGIN_DOCTOR: "/v1/auth/login/doctor",
  LOGOUT_DOCTOR: "/v1/auth/logout/doctor",
};
