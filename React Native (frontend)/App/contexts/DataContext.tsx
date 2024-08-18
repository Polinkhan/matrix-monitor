import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { NetworkProps } from "../common/types";

interface ContextProps {
  activeNetwork: NetworkProps;
  setActiveNetwork: Dispatch<SetStateAction<NetworkProps | undefined>>;
}

interface Provider {
  children: ReactNode;
}

const DataContext = createContext<Partial<ContextProps>>({});
export const useDataContext = () => useContext(DataContext);

const DataContextProvider = ({ children }: Provider) => {
  const [activeNetwork, setActiveNetwork] = useState<NetworkProps>();

  // useEffect(() => {
  //   (async () => {
  //     const data = await SecureStore.getItemAsync("activeNetwork");
  //     setActiveNetwork(JSON.parse(data));
  //   })();
  // }, []);

  const value: any = { activeNetwork, setActiveNetwork };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContextProvider;
