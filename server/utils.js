import CryptoJS from "crypto-js";

export function EncryptPassword(password) {
  const hashedPassword = CryptoJS.SHA256(password).toString();

  return hashedPassword;
}
