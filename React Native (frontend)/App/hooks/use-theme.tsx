import { useColorScheme } from "react-native";

const useTheme = () => {
  const colorScheme: any = useColorScheme();

  const theme = {
    statusBar: "dark",
    primaryText: "#454545",
    secondaryText: "#eee",
    headerText: "#000",
    bgColor: "#fff",
  };

  if (colorScheme === "dark") {
    theme.statusBar = "light";
    theme.primaryText = "#cbcbcb";
    theme.secondaryText = "#f0f0f0";
    theme.headerText = "#ccc";
    theme.bgColor = "#1d1d1d";
  }

  return theme;
};

export default useTheme;
