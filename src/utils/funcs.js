export function isBlank(val) {
  return val == undefined || val == null || val == "";
}

export function calculateAge(dateString) {
  let birthDate = new Date(dateString);
  if (isNaN(birthDate)) return "N/A";
  let today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() <= birthDate.getDate())) {
    age--;
  }
  return age;
}

export function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }

  return true;
}

export function decodeJWT(token) {
  if (!token) {
    return;
  }
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}
