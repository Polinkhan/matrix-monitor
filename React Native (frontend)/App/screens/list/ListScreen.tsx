import { ScrollView, StyleSheet, ToastAndroid, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { delay, SECURE_STORE } from "../../common/helper";
import { NetworkProps } from "../../common/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SECURE_HOSTNAME, SECURE_IP } from "../../common/config";
import { Feather, Ionicons } from "@expo/vector-icons";
import { Color } from "../../Theme/Color";
import Typography from "../../components/Typography";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import Stack from "../../components/Stack";
import { LinearGradient } from "expo-linear-gradient";
import BannerLogo from "../../assets/svg/BannerLogo";
import useTheme from "../../hooks/use-theme";

const ListScreen = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { secondaryText, headerText } = useTheme();

  const [visible, setVisible] = useState(false);
  const [pressedIp, setPressedIp] = useState(null);
  const [networks, setNetworks] = useState<NetworkProps[]>([]);

  const showDialog = (ip: string) => {
    setPressedIp(ip);
    setVisible(true);
  };
  const hideDialog = () => {
    setPressedIp(null);
    setVisible(false);
  };

  const updateNetworkList = () => {
    SECURE_STORE.NETWORK_LIST().then((data) => setNetworks(data));
  };

  useEffect(() => {
    delay(100).then(updateNetworkList);
  }, [isFocused]);

  const hanleOnPress = async (network: NetworkProps) => {
    await SECURE_STORE.ADD_ACTIVE_NETWORK(network);
    navigation.navigate("home");
  };

  const confirmDelete = async () => {
    ToastAndroid.show("Host Deleted", ToastAndroid.SHORT);
    await SECURE_STORE.DELETE_NETWORK(pressedIp);
    updateNetworkList();
    hideDialog();
  };

  return (
    <View style={styles.container}>
      <Stack row px={1} align="center">
        <Stack row gap={1} style={{ flex: 1 }}>
          <Typography bold xl color={headerText}>
            Host
          </Typography>
          <Typography bold xl color={"#2c5b85"}>
            List
          </Typography>
        </Stack>
      </Stack>

      <ScrollView contentContainerStyle={styles.container}>
        {networks.map((props, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.8}
            style={{}}
            onLongPress={() => showDialog(props[SECURE_IP])}
            onPress={async () => await hanleOnPress(props)}
          >
            <Stack row>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                style={{ flex: 1, height: 100, borderRadius: 10 }}
                colors={[Color.primary, Color.tint]}
              >
                <Stack row style={{ height: "100%" }}>
                  <View style={{ flex: 2 }}>
                    <Stack p={2} gap={1} justify="center" align="flex-start" style={{ height: "100%" }}>
                      <Typography color={secondaryText} lg px={1}>
                        {props[SECURE_HOSTNAME]}
                      </Typography>
                      <Typography color={secondaryText} sm px={1}>
                        {props[SECURE_IP]}
                      </Typography>
                    </Stack>
                  </View>
                  <View style={{ height: "100%", flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <BannerLogo size={60} />
                  </View>
                </Stack>
              </LinearGradient>
            </Stack>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{ alignItems: "flex-end" }}>
        <TouchableOpacity onPress={() => navigation.navigate("register")} delayLongPress={3}>
          <Ionicons name="add-circle" size={60} color={Color.primary} />
        </TouchableOpacity>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ borderRadius: 36 }}>
          <Dialog.Title>Confirmation</Dialog.Title>
          <Dialog.Content style={{ gap: 4 }}>
            <Text variant="bodyMedium">Are you sure you want to delete this host ?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={confirmDelete}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
  },

  box: {
    gap: 12,
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    elevation: 1, // changed to a greater value
  },

  container: {
    flex: 1,
    gap: 16,
    backgroundColor: "#fff",
  },
});
