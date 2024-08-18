import axios from "axios";
import { UrlBuilder } from "../common/helper";
import * as securestore from "expo-secure-store";
import { ProtocolType, UrlTypes } from "../common/types";
import { SECURE_ERROR_MSG, SECURE_IP, SECURE_PROTOCOL } from "../common/config";

type GetClientProps = {
  type: UrlTypes;
};

const getClient = async ({ type }: GetClientProps) => {
  const ip = await securestore.getItemAsync(SECURE_IP);
  const protocol = (await securestore.getItemAsync(SECURE_PROTOCOL)) as ProtocolType;

  if (!ip || !protocol) throw new Error(SECURE_ERROR_MSG);

  const API_URL = UrlBuilder({ ip, protocol, type });
  return axios.create({ baseURL: API_URL });
};

const API = (url: any) => ({
  base: axios.create({ baseURL: `${url}/api/v1` }),
  cmd: axios.create({ baseURL: `${url}/api/v1/cmd`, timeout: 3000 }),
  status: axios.create({ baseURL: `${url}/api/v1/status`, timeout: 3000 }),
});

export { API, getClient };
