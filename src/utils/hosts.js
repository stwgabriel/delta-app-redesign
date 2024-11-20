export function get_api_host() {
  return "http://localhost:8000";
}
export function get_socket_host() {
  return "wss://i2751iwn1e.execute-api.us-east-1.amazonaws.com/production";
}

export const ROUTES = {
  //Home
  HOME: "/",
  // Logins
  LOGIN_HOSPITAL: "/login/hospital",
  LOGIN_DOCTOR: "/",
  LOGIN_CONSULTOR: "/",
  //Landing pages
  LANDING_PAGE_DOCTOR: "/overview/doctor",
  LANDING_PAGE_CONSULTOR: "/overview/consultor",
  // Prontuário
  PRONTUARIO: "/prontuario/pag1",
  PRONTUARIO_PAG1: "/prontuario/pag1",
  PRONTUARIO_PAG2: "/prontuario/pag2",
  PRONTUARIO_PAG3: "/prontuario/pag3",
};
