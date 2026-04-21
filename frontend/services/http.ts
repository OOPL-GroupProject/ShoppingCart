import axios from "axios";

function cleanApiUrl(url: string): string {
  return url.split("#")[0].trim().replace(/\/$/, "");
}

export function resolveApiBaseUrl(): string {
  const internalApiUrl = process.env.API_URL;
  if (internalApiUrl) {
    return cleanApiUrl(internalApiUrl);
  }

  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (publicApiUrl) {
    return cleanApiUrl(publicApiUrl);
  }

  const csharpApiUrl = process.env.NEXT_PUBLIC_CSHARP_API_URL;
  if (csharpApiUrl) {
    return `${cleanApiUrl(csharpApiUrl)}/api`;
  }

  return "http://localhost:5000/api";
}

const apiBaseUrl = resolveApiBaseUrl();

export const http = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});
