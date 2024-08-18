import { ScrollView, StyleSheet, View, useColorScheme } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import useTheme from "../hooks/use-theme";

interface MainLayoutProps {
  children: ReactNode;
}

const BodyLayout = ({ children }: MainLayoutProps) => {
  const { statusBar }: any = useTheme();

  return (
    <>
      <ExpoStatusBar style={statusBar} />
      <ScrollView contentContainerStyle={styles.container}>{children}</ScrollView>
    </>
  );
};

export default BodyLayout;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // gap: 16,
  },
});
