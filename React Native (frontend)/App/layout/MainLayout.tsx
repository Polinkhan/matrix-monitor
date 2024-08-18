import { StatusBar, StyleSheet, View, useColorScheme } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import useTheme from "../hooks/use-theme";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { statusBar, bgColor } = useTheme();

  return (
    <>
      <ExpoStatusBar style={statusBar as any} />
      <View style={[styles.container, { backgroundColor: bgColor }]}>{children}</View>
    </>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: StatusBar.currentHeight && StatusBar.currentHeight + 16,
  },
});
