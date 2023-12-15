/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

class Api {
  service;

  constructor() {
    const service = axios.create({
      baseURL: "https://dummyjson.com/",
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
}

export default new Api();
