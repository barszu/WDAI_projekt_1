/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

//opakowanie do obslugi zadan HTTP za pomoca Axios

class Api {
  service;

  constructor() {
    const service = axios.create({
      baseURL: "http://127.0.0.1:5000/",
      responseType: "json",
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess = (response) => {
    const successResponse = { ...response };
    // console.log(successResponse);
    return successResponse?.data || null;
  };

  handleError = (error) => {
    const errorResponse = { ...error };
    console.error(errorResponse);
    return null;
  };

  ApiCall = async ({ method = "GET", url = "", data = {}, headers = {} }) => {
    return this.service
      .request({
        method,
        url,
        data,
        headers: {
          ...headers,
        },
      })
      .then((response) => response);
  };

  ApiCallAuth = async ({
    method = "GET",
    url = "",
    data = {},
    headers = {},
  }) => {
    return this.service
      .request({
        method,
        url,
        data,
        headers: {
          ...headers,
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((response) => response);
  };
}

export default new Api();
