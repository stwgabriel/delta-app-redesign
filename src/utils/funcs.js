/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
export function humanFileSize(bytes, si = true, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return bytes.toFixed(dp) + " " + units[u];
}

export function formatCPF(value) {
  let newValue = value.replace(/\D/g, "");
  if (newValue.length > 11) {
    newValue = newValue.slice(0, 11); // Limita a 11 dígitos
  }
  newValue = newValue.replace(/(\d{3})(\d)/, "$1.$2");
  newValue = newValue.replace(/(\d{3})(\d)/, "$1.$2");
  newValue = newValue.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return newValue;
}

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

export function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
  );
}

export function getValueFromObj(obj, _default = "NÃO INFORMADO") {
  if (obj === null || obj === undefined) return _default;
  if (obj.value === null) return _default;

  // console.log(obj);

  switch (obj.value_column) {
    case "value_text":
      return obj.value;
    case "value_int":
      return obj.value;
    case "value_bool":
      return obj.value ? "Sim" : "Não";
    case "value_timestamptz":
      return new Date(obj.value).toLocaleString();
    case "value_timestamp":
      return new Date(obj.value).toLocaleString();
    case "value_date":
      console.log(obj.value);
      return new Date(obj.value).toLocaleDateString();
    default:
      console.warn("Value column Input not expected", obj.value_column);
      return "N/A";
  }
}

export function getMaxNIHCount(template) {
  if (!template) return 1;
  let maxScore = template.reduce((acc, section) => acc + Math.max(...section.items.map((q) => q.score)), 0);
  return maxScore;
}
