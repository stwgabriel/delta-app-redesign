export function get_api_host() {
  return process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:8000";
  // return "https://3l03puaz4j.execute-api.sa-east-1.amazonaws.com/dev";
  // return "http://mylocaldbalex.duckdns.org:8000";
}
export function get_socket_host() {
  return process.env.NEXT_PUBLIC_WS_ENDPOINT || "wss://i2751iwn1e.execute-api.us-east-1.amazonaws.com/production";
  // return "wss://i2751iwn1e.execute-api.us-east-1.amazonaws.com/production";
}

export const ROUTES = {
  // Home
  HOME: "/",
  // Signup
  SIGNUP_CONSULTOR: "/signup/consultor",
  SIGNUP_HOSPITAL: "/signup/hospital",
  // Logins
  LOGIN_HOSPITAL: "/login/hospital",
  LOGIN_DOCTOR: "/login/doctor",
  LOGIN_CONSULTOR: "/login/consultor",
  //Landing pages
  LANDING_PAGE_DOCTOR: "/doctor/overview",
  LANDING_PAGE_CONSULTOR: "/consultor/overview",
  //Settings pages
  SETTINGS_PAGE_USER: "/user/settings",
  SETTINGS_PAGE_HOSPITAL: "/hospital/settings",
  // Prontuário
  PRONTUARIO: "/prontuario/overview",
  PRONTUARIO_PAG1: "/doctor/form/pag1",
  PRONTUARIO_PAG2: "/doctor/form/pag2",
  PRONTUARIO_PAG3: "/doctor/form/pag3",
  // Admin page
  ADMIN_PAGE: "/admin",
};

export const API_ROUTES = {
  // Auth
  REFRESH_TOKEN: "/v1/auth/refresh_token",
  SIGNUP_CONSULTOR: "/v1/auth/signup/consultor",
  SIGNUP_HOSPITAL: "/v1/auth/signup/hospital",
  LOGIN_CONSULTOR: "/v1/auth/login/consultor",
  LOGIN_HOSPITAL: "/v1/auth/login/hospital",
  LOGIN_DOCTOR: "/v1/auth/login/doctor",
  LOGOUT_DOCTOR: "/v1/auth/logout/doctor",
};
