import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CpuStatusScreenProps } from "../../common/types";
import CircularProgress from "../../components/CircularProgress";
import { Color } from "../../Theme/Color";

const CpuStatusScreen = ({ data }: { data: CpuStatusScreenProps }) => {
  const { brand, cores: coreCount, speed } = data.cpu;
  const { main } = data.cpuTemperature;
  const { cores } = data.cpuCurrentSpeed;
  const { currentLoad, cpus } = data.currentLoad;

  return (
    <View style={{ gap: 16 }}>
      <View style={styles.box}>
        <Text style={{ fontSize: 20 }}>{brand}</Text>
        <View style={styles.cpuLoad}>
          <CircularProgress
            pgColor={currentLoad > 50 ? "#DB4437" : Color.primary}
            progressPercent={currentLoad}
            size={160}
            strokeWidth={15}
            textColor=""
            textSize={20}
            text={`${currentLoad.toFixed(2)}%`}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{speed} GHz</Text>
        </View>
      </View>

      <View style={styles.box}>
        <Text style={{ fontSize: 20 }}>CPUs Clock Speed ({coreCount} Core)</Text>
        <View style={styles.cpuGHZ}>
          {cpus.map(({ load }, i) => {
            return (
              <View key={i} style={{ alignItems: "center" }}>
                <CircularProgress
                  pgColor={load > 50 ? "#DB4437" : Color.primary}
                  progressPercent={load}
                  size={70}
                  strokeWidth={5}
                  text={`${load.toFixed(2)}%`}
                />
                <Text>{cores[i]}GHz</Text>
              </View>
            );
          })}
        </View>
      </View>

      <View style={styles.box}>
        <Text style={{ fontSize: 20 }}>CPU Temperature</Text>
        <View style={styles.cpuGHZ}>
          <CircularProgress
            pgColor={main > 60 ? "#DB4437" : Color.primary}
            progressPercent={main}
            size={80}
            strokeWidth={5}
            textColor=""
            textSize={12}
            text={`${main}°c`}
          />
        </View>
      </View>
    </View>
  );
};

export default CpuStatusScreen;

const styles = StyleSheet.create({
  cpuLoad: {
    alignItems: "center",
  },
  cpuGHZ: {
    rowGap: 20,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  box: {
    gap: 30,
    width: "100%",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
