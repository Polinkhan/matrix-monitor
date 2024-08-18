import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NetworkStatusScreenProps } from "../../common/types";
import { Color } from "../../Theme/Color";
import { meterConvert } from "../../helper/functions";

const NetworkStatusScreen = ({ data }: NetworkStatusScreenProps) => {
  const { networkInterfaces, networkStats } = data;
  const speeds: any = {};
  networkStats.forEach(({ iface, rx_sec, tx_sec }) => {
    speeds[iface] = { rx_sec, tx_sec };
  });

  return (
    <React.Fragment>
      {networkInterfaces.map(({ ip4, ip6, mac, speed, type, iface }, i) => (
        <View key={i} style={styles.box}>
          <Text style={{ fontSize: 16, width: 50, textAlign: "center" }}>
            {iface}
          </Text>
          <View
            style={{ borderLeftWidth: 1, height: "100%", borderColor: "gray" }}
          />
          <View style={{ gap: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              IPv4 : {ip4}
            </Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              IPv6 : {ip6}
            </Text>
            <Text>MAC : {mac}</Text>
            <Text>Link Speed : {speed} mbps</Text>
            <Text>Connection Type : {type}</Text>
            {speeds[iface] && (
              <View style={{ gap: 5 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Rx :{" "}
                  <Text style={{ color: Color.success }}>
                    {meterConvert(speeds[iface].rx_sec)}
                  </Text>
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                  Tx :{" "}
                  <Text style={{ color: Color.error }}>
                    {meterConvert(speeds[iface].tx_sec)}
                  </Text>
                </Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </React.Fragment>
  );
};

export default NetworkStatusScreen;

const styles = StyleSheet.create({
  box: {
    gap: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
