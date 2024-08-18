import axios from "axios";
import { useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { DEFAULT_INTERVAL_TIME } from "../common/config";

const useIntervalFetch = (url: string, interval_time?: number) => {
  const [data, setData] = useState();
  let controller: AbortController;

  const fetch = async () => {
    controller = new AbortController();

    try {
      const { data } = await axios.get(url, { signal: controller.signal });

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
      if (controller) controller.abort();
      clearInterval(interval_id);
    };
  }, [url]);

  return { data };
};

export default useIntervalFetch;
