import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DrawerNavigator from "./DrawerNavigator";
import StackNavigator from "./StackNavigator";

const Navigation = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* <DrawerNavigator /> */}
      <StackNavigator />
    </View>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
