import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Navigation from "./App/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import { Color } from "./App/Theme/Color";
import DataContextProvider from "./App/contexts/DataContext";

export default function App() {
  const theme = {
    ...DefaultTheme,
    roundness: 6,
    colors: {
      ...DefaultTheme.colors,
      primary: Color.primary,
    },
  };

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <DataContextProvider>
          <Navigation />
        </DataContextProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
