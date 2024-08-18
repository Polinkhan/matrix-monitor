import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DiskStatusScreenProps } from "../../common/types";
import { meterConvert } from "../../helper/functions";
import { Color } from "../../Theme/Color";
import HRText from "../../components/HRText";
import Stack from "../../components/Stack";
import Dot from "../../components/Dot";

const DiskStatusScreen = ({ data }: DiskStatusScreenProps) => {
  const { diskLayout, fsSize } = data;
  const mountedDrives: any = {};
  fsSize.forEach((val) => {
    const { fs } = val;
    diskLayout.forEach(({ device }, i) => {
      if (fs.includes(device)) {
        if (!mountedDrives[i]) mountedDrives[i] = [];
        mountedDrives[i].push(val);
      }
    });
  });

  return (
    <React.Fragment>
      {diskLayout.map((data, i) => (
        <View key={i} style={{ gap: 10 }}>
          <Drive key={i} data={data} mount={mountedDrives[i] || []} />
          <View style={styles.hr} />
        </View>
      ))}
    </React.Fragment>
  );
};

const Drive = ({ data, mount }: { data: any; mount: Array<any> }) => {
  const { name, size, type } = data;

  return (
    <View style={styles.list}>
      <HRText>{name}</HRText>
      <Text style={{ fontWeight: "bold", color: Color.primary }}>
        Type : {data.type}
      </Text>
      <Text style={{ fontWeight: "bold", color: Color.primary }}>
        Size : {meterConvert(size)}
      </Text>

      <Stack gap={2}>
        {mount.map(({ used, size, use, fs, available }, i) => (
          <Stack key={i} gap={0.5}>
            <Stack row gap={1} align="center">
              <Dot size={10} />
              <Text>
                {fs} ({meterConvert(size)})
              </Text>
            </Stack>
            <View style={styles.OuterPercentageBox}>
              <View
                style={[
                  styles.percentageBox,
                  { width: `${use}%`, backgroundColor: Color.primary },
                ]}
              >
                <Text style={{ color: "#fff" }}>{meterConvert(used)}</Text>
              </View>
              <View style={[styles.percentageBox, { flex: 1 }]}>
                <Text>{meterConvert(available)}</Text>
              </View>
            </View>
          </Stack>
        ))}
      </Stack>

      <View style={{ flexDirection: "row", gap: 10 }}></View>
    </View>
  );
};
export default DiskStatusScreen;

const styles = StyleSheet.create({
  hr: {
    borderBottomWidth: 0.5,
    borderBottomColor: Color.tint,
  },
  list: {
    gap: 6,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  percentageBox: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  OuterPercentageBox: {
    backgroundColor: "#f0f0f0",
    height: 50,
    flexDirection: "row",
  },
});
