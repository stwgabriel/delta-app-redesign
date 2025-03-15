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
  ABOUT: "/about",
  TRATAMENTOS: "/tratamentos",
  // Signup
  SIGNUP_CONSULTOR: "/signup/consultor",
  // Logins
  LOGIN_HOSPITAL: "/login/hospital",
  LOGIN_HOSPITAL_ONE_TIME_PASSWORD: "/login/hospital/one_time_password",
  LOGIN_CONSULTOR: "/login/consultor",

  ADMIN: {
    ADMIN_PAGE: "/admin",
    SIGNUP_HOSPITAL: "/admin/signup/hospital",
  },

  CONSULTOR: {
    //Landing pages
    LANDING_PAGE_CONSULTOR: "/consultor/overview",
    // Shift
    SCHEDULER_PAGE: "/user/scheduler",
  },

  DOCTOR: {
    //Landing pages
    LANDING_PAGE_DOCTOR: "/doctor/overview",
    // Prontuário
    PRONTUARIO_PAG1: "/doctor/form/pag1",
    PRONTUARIO_PAG2: "/doctor/form/pag2",
    PRONTUARIO_PAG3: "/doctor/form/pag3",
    // Parecer
    PARECER: "/doctor/parecer",
  },

  USER: {
    //Settings pages
    SETTINGS_PAGE_USER: "/user/settings",
    SETTINGS_PAGE_HOSPITAL: "/user/hospital",
    // Prontuário
    PRONTUARIO: "/prontuario",
  },

  HOSPITAL: {
    //Settings pages
    LOGIN_DOCTOR: "/login/doctor",
  },
};

export const API_ROUTES = {
  // Auth
  REFRESH_TOKEN: "/v1/auth/refresh_token",
  SIGNUP_CONSULTOR: "/v1/auth/signup/consultor",
  LOGIN_CONSULTOR: "/v1/auth/login/consultor",
  LOGIN_HOSPITAL: "/v1/auth/login/hospital",
  LOGIN_DOCTOR: "/v1/auth/login/doctor",
  LOGOUT_DOCTOR: "/v1/auth/logout/doctor",
};
