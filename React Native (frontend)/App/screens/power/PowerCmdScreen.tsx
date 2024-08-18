import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React from "react";
import LinkButton from "../../components/LinkButton";
import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import Stack from "../../components/Stack";
import axios from "axios";
import { useDataContext } from "../../contexts/DataContext";
import { API } from "../../api/api";

const PowerCmdScreen = () => {
  const { activeNetwork } = useDataContext();

  const handlePress = async (cmd: string, onSuccess: string) => {
    try {
      const api = API(activeNetwork?.URL).cmd;
      await api.post("power", { cmd });
      ToastAndroid.show(onSuccess, ToastAndroid.SHORT);
    } catch (err) {
      //   ToastAndroid.show(err?.message, ToastAndroid.SHORT);
    }
  };

  return (
    <Stack gap={4} justify="center" align="center" style={{ flex: 1 }}>
      {PowerButtonList.map(({ id, title, icon, cmd, onSuccess }) => (
        <LinkButton key={id} gap={3} icon={icon} title={title} onPress={() => handlePress(cmd, onSuccess)} />
      ))}
    </Stack>
  );
};
``;
export default PowerCmdScreen;

const PowerButtonList = [
  {
    id: "cmd-button-1",
    cmd: "shutdown",
    onSuccess: "PC Shutting Down",
    title: "Power Off",
    icon: <Feather name="power" size={36} color="#fff" />,
  },
  {
    id: "cmd-button-2",
    cmd: "reboot",
    title: "Restart",
    onSuccess: "PC Restarting",
    icon: <MaterialCommunityIcons name="restart" size={36} color="#fff" />,
  },
  {
    id: "cmd-button-3",
    cmd: "lock",
    title: "Lock",
    onSuccess: "PC Locked",
    icon: <MaterialIcons name="lock" size={36} color="#fff" />,
  },
];

const styles = StyleSheet.create({});
