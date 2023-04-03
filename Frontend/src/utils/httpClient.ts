import customAxios from "./customAxios";

export default function httpClient({
    url,
    method,
    headers,
    data
}: {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  data?: any;
}) {
    const axios = customAxios();
    return axios({
        url,
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        data: {
            ...data,
        }
    });
}