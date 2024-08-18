import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { StyleSheet, ToastAndroid, View, Keyboard } from "react-native";
import { Button, Dialog, Portal, RadioButton, Text, TextInput } from "react-native-paper";

import HRText from "../components/HRText";
import { SECURE_STORE, UrlBuilder } from "../common/helper";
import { ProtocolType } from "../common/types";
import axios from "axios";

const RegisterNetwork = ({ navigation }: any) => {
  const [ip, setIp] = useState("");
  const [hostname, setHostname] = useState("");
  const [visible, setVisible] = React.useState(false);
  const [protocol, setProtocol] = useState<ProtocolType>("http");

  const showDialog = () => {
    Keyboard.dismiss();
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  const addNetwork = () => {
    hideDialog();
    SECURE_STORE.ADD_NETWORK({ ip, protocol, hostname });
    ToastAndroid.show("New Host Added", ToastAndroid.SHORT);
    navigation.goBack();
  };

  const handleSubmit = () => {
    if (!ip) ToastAndroid.show("Please enter an IP address", ToastAndroid.SHORT);
    else if (ip.split(".").length !== 4) ToastAndroid.show("Please enter an valid IP address", ToastAndroid.SHORT);
    else if (!hostname) ToastAndroid.show("Please enter a Hostname", ToastAndroid.SHORT);
    else {
      axios
        .get(UrlBuilder({ ip, protocol, type: "base" }), { timeout: 1000 })
        .then(addNetwork)
        .catch(showDialog);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, gap: 20 }}>
        <HRText>Add New Network</HRText>
        <View style={{ flex: 1, gap: 16 }}>
          <TextInput
            label="Network Name"
            onChangeText={(text) => setHostname(text)}
            style={{ backgroundColor: "#e5e5e5" }}
          />

          <View style={{ flexDirection: "row", gap: 16 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: "#e5e5e5",
                borderBottomWidth: 0.5,
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
              }}
            >
              <Picker selectedValue={protocol} onValueChange={(itemValue, itemIndex) => setProtocol(itemValue)}>
                <Picker.Item label="http" value="http" />
                <Picker.Item label="https" value="https" />
              </Picker>
            </View>
            <TextInput
              label="IP OR Domain"
              keyboardType="numeric"
              placeholder="eg: 192.168.1.27"
              placeholderTextColor={"#a0aec0"}
              onChangeText={(text) => setIp(text)}
              style={{ flex: 2, backgroundColor: "#e5e5e5" }}
            />
          </View>

          <Button mode="contained" contentStyle={{ padding: 5 }} style={{ marginTop: 30 }} onPress={handleSubmit}>
            ADD
          </Button>
        </View>
      </View>

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog} style={{ borderRadius: 36 }}>
          <Dialog.Title>Host Unreachable</Dialog.Title>
          <Dialog.Content style={{ gap: 4 }}>
            <Text variant="bodyLarge">{ip} is not reachable at this moment.</Text>
            <Text variant="bodyMedium">Would you like to add this config ?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={addNetwork}>Proceed</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default RegisterNetwork;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 60,
    padding: 20,
  },
  address: {
    padding: 20,
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 1,
  },

  radio: {
    flexDirection: "row",
    alignItems: "center",
  },
});
