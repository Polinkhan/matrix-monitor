import * as securestore from "expo-secure-store";
import {
  API_STATUS_PATH,
  API_VERSIONING_PATH,
  PORT,
  SECURE_HOSTNAME,
  SECURE_IP,
  SECURE_NETWORKS,
  SECURE_PROTOCOL,
} from "./config";
import { NetworkProps, ProtocolType, StatusType, UrlTypes } from "./types";

// ------------- TYPES -------------

export type UrlBuilderProps = {
  ip: string;
  protocol: ProtocolType;
  type: UrlTypes;
};

// ------------- FUNCTIONS -------------

export const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const SECURE_STORE = {
  NETWORK_LIST: async () => JSON.parse(await securestore.getItemAsync(SECURE_NETWORKS)) || [],
  NETWORK_REMOVE_ALL: async () => await securestore.deleteItemAsync(SECURE_NETWORKS),
  ADD_NETWORK: async (props: NetworkProps) => {
    const DATA = (JSON.parse(await securestore.getItemAsync(SECURE_NETWORKS)) as NetworkProps[]) || [];
    DATA.push(props);
    await securestore.setItemAsync(SECURE_NETWORKS, JSON.stringify(DATA));
  },
  DELETE_NETWORK: async (ip: string) => {
    const DATA = (JSON.parse(await securestore.getItemAsync(SECURE_NETWORKS)) as NetworkProps[]) || [];
    const NEW_DATA = DATA.filter((_) => _[SECURE_IP] !== ip);
    await securestore.setItemAsync(SECURE_NETWORKS, JSON.stringify(NEW_DATA));
  },
  ADD_ACTIVE_NETWORK: async (props: NetworkProps) => {
    await securestore.setItemAsync(SECURE_IP, props[SECURE_IP]);
    await securestore.setItemAsync(SECURE_PROTOCOL, props[SECURE_PROTOCOL]);
    await securestore.setItemAsync(SECURE_HOSTNAME, props[SECURE_HOSTNAME]);
  },
  GET_ACTIVE_NETWORK: async () => {
    const result = {};
    result[SECURE_IP] = await securestore.getItemAsync(SECURE_IP);
    result[SECURE_PROTOCOL] = await securestore.getItemAsync(SECURE_PROTOCOL);
    result[SECURE_HOSTNAME] = await securestore.getItemAsync(SECURE_HOSTNAME);
    return result;
  },
  // GET: async (name: string) => await securestore.getItemAsync(name),
  // SET: async (name: string, value: string) => await securestore.setItemAsync(name, value),
  // GET_MULTIPLE: async (names: string[]) => {
  //   const result = {};
  //   names.forEach(async (name) => (result[name] = await securestore.getItemAsync(name)));
  //   return result;
  // },
};

export const UrlBuilder = ({ ip, protocol, type }: UrlBuilderProps) => {
  const IP = ip + ":" + PORT;
  const PROTOCOL = protocol + "://";

  switch (type) {
    // For API
    case "api": {
      const URL = [IP, API_VERSIONING_PATH, API_STATUS_PATH].join("/");
      return PROTOCOL + URL;
    }

    // For Base URL
    case "base": {
      const URL = [IP].join("/");
      return PROTOCOL + URL;
    }

    // For Command
    case "cmd": {
      return;
    }

    default:
      return;
  }
};
