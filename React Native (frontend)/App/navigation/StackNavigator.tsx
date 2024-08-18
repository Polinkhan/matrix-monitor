import React from "react";
import { CardStyleInterpolators, TransitionSpecs, createStackNavigator } from "@react-navigation/stack";
import Settings from "../screens/RegisterNetwork";
import Home from "../screens/home";
import RegisterNetwork from "../screens/RegisterNetwork";
import Cpu from "../screens/cpu";
import Memory from "../screens/memory";
import Network from "../screens/network";
import Disk from "../screens/disk";
import Process from "../screens/process";
import Power from "../screens/power";
import KillProcess from "../screens/kill-Process";
import List from "../screens/list";

const Stack = createStackNavigator();

const Modal: any = {
  cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
  gestureEnabled: true,
  gestureDirection: "vertical",
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="list"
      screenOptions={{
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="list" component={List} options={{ headerShown: false, title: "Server Monitor" }} />
      <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="cpu" component={Cpu} options={{ title: "CPU Information" }} />
      <Stack.Screen name="memory" component={Memory} options={{ title: "Memory Information" }} />
      <Stack.Screen name="network" component={Network} options={{ title: "Network Information" }} />
      <Stack.Screen name="disk" component={Disk} options={{ title: "Disk Information" }} />
      <Stack.Screen name="process" component={Process} options={{ title: "Top Processes" }} />
      <Stack.Screen name="power" component={Power} options={{ title: "Power Command", ...Modal }} />
      <Stack.Screen name="kill-process" component={KillProcess} options={{ title: "Kill Process" }} />
      <Stack.Screen
        name="setup"
        component={Settings}
        options={{
          title: "Please add network first",
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          gestureEnabled: true,
          gestureDirection: "vertical",
        }}
      />

      <Stack.Screen
        name="register"
        component={RegisterNetwork}
        options={{
          title: "Register",
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
          gestureEnabled: true,
          gestureDirection: "vertical",
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
