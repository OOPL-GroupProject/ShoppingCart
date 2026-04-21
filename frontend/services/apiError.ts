import axios from "axios";

export function getApiErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return "Something went wrong. Please try again.";
  }

  if (error.code === "ECONNABORTED") {
    return "The request timed out. Please try again.";
  }

  if (!error.response) {
    return "Unable to reach the server. Please check your connection.";
  }

  if (error.response.status === 400) {
    return "Please review the form values and try again.";
  }

  if (error.response.status === 404) {
    return "The requested resource was not found.";
  }

  if (error.response.status >= 500) {
    return "The server had an issue. Please try again in a moment.";
  }

  return "Request failed. Please try again.";
}
