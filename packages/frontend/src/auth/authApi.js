import { post, get } from "../util";

export async function login(handle, password) {
  return await post("api/auth/login", { handle, password });
}

export async function register(
  handle,
  firstName,
  password
) {
  return await post("api/auth/register", { handle, firstName,password });
}

export async function checkSession() {
  return await get("api/auth/check");
}

export async function logout() {
  return await post("api/auth/logout");
}
