import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AntDesign, Feather, FontAwesome5 } from "@expo/vector-icons";
import { Color } from "../Theme/Color";
import RegisterNetwork from "../screens/RegisterNetwork";
import { Button, IconButton } from "react-native-paper";
import { useDataContext } from "../contexts/DataContext";

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({ navigation }: any) => {
  const { activeNetwork } = useDataContext();

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveBackgroundColor: Color.tint,
        drawerActiveTintColor: "#000",
        drawerInactiveTintColor: "#000",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color, focused, size }) => <Feather name="home" size={20} color={color} />,
          title: activeNetwork?.networkName,
          headerRight: () => (
            <Button icon="swap-horizontal" onPress={() => navigation.navigate("changeNetwork")}>
              Change Network
            </Button>
          ),
        }}
      />
      <Drawer.Screen
        name="register"
        component={RegisterNetwork}
        options={{
          title: "Register Network",
          drawerIcon: ({ color, focused, size }) => <AntDesign name="setting" size={20} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
