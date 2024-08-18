import { SECURE_HOSTNAME, SECURE_IP, SECURE_PROTOCOL } from "./config";

export type MethodType = "GET" | "POST" | "DELETE";

export interface CpuAndMemStatusScreenProps {
  data: {
    cpu: {
      brand: string;
      cores: number;
      manufacturer: string;
      speed: number;
      speedMin: number;
      speedMax: number;
    };
    currentLoad: {
      currentLoad: number;
      cpus: Array<{ load: number }>;
    };
    cpuCurrentSpeed: {
      cores: Array<number>;
    };
    cpuTemperature: {
      main: number;
    };
    mem: {
      total: number;
      free: number;
      used: number;
      available: number;
      swaptotal: number;
      swapused: number;
      swapfree: number;
    };
  };
}

export interface NetworkStatusScreenProps {
  data: {
    networkInterfaces: Array<{
      ip4: string;
      ip6: string;
      mac: string;
      speed: number;
      type: string;
      iface: string;
    }>;
    networkStats: Array<{
      rx_sec: number;
      tx_sec: number;
      iface: string;
    }>;
  };
}

export interface DiskStatusScreenProps {
  data: {
    diskLayout: Array<{
      type: string;
      name: string;
      size: number;
      device: string;
    }>;
    fsSize: Array<{
      fs: string;
      type: string;
      size: number;
      used: number;
      available: number;
      use: number;
    }>;
  };
}

export interface ProcessStatusScreenProps {
  data: Array<Process>;
}

export type Process = {
  pid: number;
  name: string;
  cpu: number;
  mem: number;
  user: string;
};

export type NetworkProps = {
  [SECURE_IP]: string;
  [SECURE_HOSTNAME]: string;
  [SECURE_PROTOCOL]: ProtocolType;
};

export type UrlTypes = "api" | "cmd" | "base";
export type ProtocolType = "http" | "https";
export type StatusType = "cpu" | "memory" | "disk" | "network" | "services";
