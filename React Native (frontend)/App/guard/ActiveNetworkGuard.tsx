import { ToastAndroid } from "react-native";
import { useDataContext } from "../contexts/DataContext";

const ActiveNetworkGuard = ({ children }: any) => {
  const { activeNetwork } = useDataContext();
  return activeNetwork ? children : ToastAndroid.show("Network Not Selected", ToastAndroid.SHORT);
};

export default ActiveNetworkGuard;
