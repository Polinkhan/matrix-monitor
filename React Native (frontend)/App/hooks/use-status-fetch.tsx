import axios from "axios";
import { useEffect, useState } from "react";
import { DEFAULT_INTERVAL_TIME } from "../common/config";
import { StatusType } from "../common/types";
import { getClient } from "../api/api";

interface UseStatusFetch {
  type: StatusType;
  interval_time?: number;
  dependencies?: any[];
}

const useStatusFetch = ({ type, interval_time, dependencies = [] }: UseStatusFetch) => {
  const [data, setData] = useState();
  let controller: AbortController;

  const fetch = async () => {
    controller = new AbortController();

    try {
      const client = await getClient({ type: "api" });
      const { data } = await client.get(type, { signal: controller.signal });
      setData(data);
    } catch (err: any) {
      console.log(err);
      // ToastAndroid.show(err.message, ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    fetch();
    const interval_id = setInterval(fetch, interval_time || DEFAULT_INTERVAL_TIME);
    return () => {
      if (controller) controller.abort();
      clearInterval(interval_id);
    };
  }, dependencies);

  return { data };
};

export default useStatusFetch;
