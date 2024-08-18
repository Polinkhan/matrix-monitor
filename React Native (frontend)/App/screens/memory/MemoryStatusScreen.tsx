import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import { CpuAndMemStatusScreenProps } from "../../common/types";
import { meterConvert } from "../../helper/functions";
import LinearProgress from "../../components/LinearProgress";
import { Color } from "../../Theme/Color";

const MemoryStatusScreen = ({ data }: CpuAndMemStatusScreenProps) => {
  const { total, available, swaptotal, swapfree } = data.mem;

  const memAvailable = (available / total) * 100;
  const memUsed = 100 - memAvailable;
  const swapAvailable = (swapfree / swaptotal) * 100;
  const swapUsed = 100 - swapAvailable;

  const { width } = useWindowDimensions();

  return (
    <React.Fragment>
      <View style={styles.box}>
        <Text style={{ fontSize: 20 }}>Current Memory LOAD</Text>
        <View style={{ width: "100%", gap: 5 }}>
          <Text style={{ width: "100%", textAlign: "right", paddingRight: 10 }}>
            {meterConvert(total - available)} / {meterConvert(total)}
          </Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, flex: 1 }}>Memory</Text>
            <Text style={{ fontSize: 16 }}> :{"   "} </Text>
            <LinearProgress
              width={width * 0.65}
              height={20}
              strokeWidth={2}
              text={`${memUsed.toFixed(2)}%`}
              progressPercent={memUsed}
              pgColor={Color.primary}
              textColor="#333333"
            />
          </View>
        </View>
        <View style={{ width: "100%", gap: 5 }}>
          <Text style={{ width: "100%", textAlign: "right", paddingRight: 10 }}>
            {meterConvert(swaptotal - swapfree)} / {meterConvert(swaptotal)}
          </Text>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, flex: 1 }}>Swap</Text>
            <Text style={{ fontSize: 16 }}> :{"   "} </Text>
            <LinearProgress
              width={width * 0.65}
              height={20}
              strokeWidth={2}
              text={`${swapUsed.toFixed(2)}%`}
              progressPercent={swapUsed}
              pgColor={Color.red}
              textColor="#333333"
              style={{ marginBottom: 10 }}
            />
          </View>
        </View>
      </View>
    </React.Fragment>
  );
};

export default MemoryStatusScreen;

const styles = StyleSheet.create({
  box: {
    gap: 30,
    width: "100%",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
