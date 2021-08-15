import { useQuery } from "react-query";

export enum eMethod {
  GET = "GET",
  POST = "POST",
}

export const fetcher = async (
  url: string,
  method: eMethod = eMethod.GET,
  data: any
) => {
  const options: any = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  options.body = method === eMethod.POST ? JSON.stringify(data) : null;

  return fetch(url, options)
    .then((res) => res.json())
    .catch((e: Error) => {
      throw new Error(e.message);
    });
};

export const useFetch = (key: string, url: string, data?: any) => {
  const {
    data: res,
    isLoading,
    error,
  } = useQuery(key, () => fetcher(url, eMethod.GET, data));
  return {
    data: res?.data,
    loading: isLoading,
    error: error,
  };
};
