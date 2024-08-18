import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { ProtocolType, StatusType } from "../common/types";
import * as securestore from "expo-secure-store";
import { SECURE_IP, SECURE_PROTOCOL } from "../common/config";
import { UrlBuilder } from "../common/helper";

interface UseSocketProps {
  type: StatusType;
  dependencies?: any[];
}

const useSocket = ({ type, dependencies = [] }: UseSocketProps) => {
  let socket: Socket<any>;
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const ip = await securestore.getItemAsync(SECURE_IP);
      const protocol = (await securestore.getItemAsync(SECURE_PROTOCOL)) as ProtocolType;
      const url = UrlBuilder({ ip, protocol, type: "base" });
      socket = io(url, { transports: ["websocket"] });
      socket.emit(type);

      socket.on(type + "_status", (data) => {
        setData(data);
      });
    })();

    return () => {
      socket.disconnect();
    };
  }, dependencies);

  return { data };
};

export default useSocket;
