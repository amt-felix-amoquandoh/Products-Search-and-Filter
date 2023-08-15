import axios from "axios";
import axiosClient from "./index";
import { toast } from "react-toastify";

// set authorization token
export const setAuthToken = (token: string) => {
  axiosClient.defaults.headers.common.Authorization  = `Bearer ${token}`;
};

// refresh accessToken
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh-token");
  const {
    data: { access_token: accessToken },
  } = await axiosClient.post("/customer-auth/refresh-token", {
    refresh_token: refreshToken,
  });
  return accessToken;
};

// Axios interceptor to handle expired tokens
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = await refreshAccessToken();
      setAuthToken(token);
      return await axiosClient(originalRequest);
    }

    return Promise.reject(error);
  }
);

// get request
export const getRequest = async (url: string) => {
  return new Promise<any>((resolve, reject) => {
    axiosClient
      .get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          // 👇 error: AxiosError<any, any>
          toast(error.response?.data.message, {
            type: "error",
          });
          // reject(error);
        } else {
          toast("An unexpected error occurred", {
            type: "error",
          });
        }
      });
  });
};

// post request
export const postRequest = (url: string, postData: any) => {
  return new Promise<any>((resolve, reject) => {
    axiosClient
      .post(url, postData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          // 👇 error: AxiosError<any, any>
          toast(error.response?.data.message, {
            type: "error",
          });
          // reject(error);
        } else {
          toast("An unexpected error occurred", {
            type: "error",
          });
        }
      });
  });
};

// patch request
export const patchRequest = async (url: string, postData: any) => {
  return new Promise<any>((resolve, reject) => {
    axiosClient
      .patch(url, postData)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          // 👇 error: AxiosError<any, any>
          toast(error.response?.data.message, {
            type: "error",
          });
          // reject(error);
        } else {
          toast("An unexpected error occurred", {
            type: "error",
          });
        }
      });
  });
};

// delete request
export const deleteRequest = async (url: string) => {
  return new Promise<any>((resolve, reject) => {
    axiosClient
      .delete(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          // 👇 error: AxiosError<any, any>
          toast(error.response?.data.message, {
            type: "error",
          });
          // reject(error);
        } else {
          toast("An unexpected error occurred", {
            type: "error",
          });
        }
      });
  });
};
