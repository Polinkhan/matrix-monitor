import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { DEFAULT_INTERVAL_TIME } from "../common/config";

const useIntervalMultiFetch = (
  urls: string[],
  dependency: any = [],
  interval_time?: number
) => {
  const [data, setData] = useState();
  let controller: AbortController[] = [];

  const fetch = async () => {
    try {
      const promises = urls.map((url, i) => {
        controller[i] = new AbortController();
        return axios.get(url, { signal: controller[i].signal });
      });

      const res: Array<AxiosResponse> = (await Promise.all(
        promises
      )) as Array<AxiosResponse>;
      const data: any = res.map(({ data }) => data);
      setData(data);
    } catch (err: any) {
      console.log(err);

      // ToastAndroid.show(err.message, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetch();
    const interval_id = setInterval(
      fetch,
      interval_time || DEFAULT_INTERVAL_TIME
    );
    return () => {
      controller.forEach((_) => _.abort());
      clearInterval(interval_id);
    };
  }, dependency);

  return { data };
};

export default useIntervalMultiFetch;
