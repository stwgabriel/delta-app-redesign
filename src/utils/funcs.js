export function isBlank(val) {
  return val == undefined || val == null || val == "";
}

export function getAge(dateString) {
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
