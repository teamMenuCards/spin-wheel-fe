import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';

import { BaseQueryFn } from '@reduxjs/toolkit/query';

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4200/";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: baseURL }
  ): BaseQueryFn<
    {
      url: string;
      method?: Method;
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }) => {
    console.log(baseURL + url);
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data.data };
    } catch (axiosError) {
      console.log(axiosError);
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
