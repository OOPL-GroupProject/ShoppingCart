import axios from "axios";

function cleanApiUrl(url: string): string {
  return url.split("#")[0].trim().replace(/\/$/, "");
}

export function resolveApiBaseUrl(): string {
  
  // For adding button :D ts was driving me crazy
  if (typeof window !== "undefined") {
    const savedBackend = localStorage.getItem("backend_preference");
    if (savedBackend === "ELIXIR") {
      const elixirApiUrl = process.env.NEXT_PUBLIC_ELIXIR_API_URL;
      if (elixirApiUrl) {
        return `${cleanApiUrl(elixirApiUrl)}/api`;
      }
    }
    if (savedBackend === "CSHARP") {
      const csharpApiUrl = process.env.NEXT_PUBLIC_CSHARP_API_URL;
      if (csharpApiUrl) {
        return `${cleanApiUrl(csharpApiUrl)}/api`;
      }
    }
  }

  // idk what these do tbh
  const internalApiUrl = process.env.API_URL;
  if (internalApiUrl) {
    return cleanApiUrl(internalApiUrl);
  }

  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (publicApiUrl) {
    return cleanApiUrl(publicApiUrl);
  }

  return "http://localhost:5000/api";
}

const apiBaseUrl = resolveApiBaseUrl();

export const http = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});