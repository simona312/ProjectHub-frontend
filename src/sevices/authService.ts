import { api } from "./api";

export type LoginRequest = {
    userName: string;
    password: string;
};

export async function login(data: LoginRequest): Promise<string> {
    const res = await api.post("Auth/login", data);

    const token = typeof res.data === "string"
    ? res.data
    :(res.data.token ?? res.data.accessToken ?? res.data.jwt);

    if(!token) {
        throw new Error("Login responce did not contain a token.");
    }
    localStorage.setItem("token", token);
    return token;
}