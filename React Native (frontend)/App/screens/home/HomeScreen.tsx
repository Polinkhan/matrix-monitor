import { ScrollView, StyleSheet, Text, ToastAndroid, useWindowDimensions, View } from "react-native";
import React, { useEffect, useState } from "react";
import LinkButton from "../../components/LinkButton";
import { Feather, FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Color } from "../../Theme/Color";
import Typography from "../../components/Typography";
import Stack from "../../components/Stack";
import { LinearGradient } from "expo-linear-gradient";
import BannerLogo from "../../assets/svg/BannerLogo";
import useTheme from "../../hooks/use-theme";
import { SECURE_STORE } from "../../common/helper";
import { SECURE_HOSTNAME, SECURE_IP } from "../../common/config";
import { CpuStatusScreenProps, MemStatusScreenProps, NetworkProps } from "../../common/types";
import CircularProgress from "../../components/CircularProgress";
import LinearProgress from "../../components/LinearProgress";
import { meterConvert } from "../../helper/functions";

const HomeScreen = ({ navigation, data }: any) => {
  const { secondaryText, headerText } = useTheme();
  const [activeNetwork, setActiveNetwork] = useState<NetworkProps>();

  const navigate = (path: string) => {
    navigation.navigate(path);
  };

  useEffect(() => {
    SECURE_STORE.GET_ACTIVE_NETWORK().then((data: NetworkProps) => {
      setActiveNetwork(data);
    });
  }, []);

  if (!activeNetwork) return;

  return (
    <Stack gap={3} style={{ flex: 1 }}>
      <Stack row px={1} align="center">
        <Stack row gap={1} style={{ flex: 1 }}>
          <Typography bold xl color={headerText}>
            PC
          </Typography>
          <Typography bold xl color={"#2c5b85"}>
            Monitor
          </Typography>
        </Stack>
      </Stack>

      <Stack row px={1}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          style={{ flex: 1, height: 150, borderRadius: 10 }}
          colors={[Color.primary, Color.tint]}
        >
          <Stack row style={{ height: "100%" }}>
            <View style={{ flex: 2 }}>
              <Stack p={2} gap={1} justify="center" align="flex-start" style={{ height: "100%" }}>
                <Typography color={secondaryText} lg px={1}>
                  {activeNetwork[SECURE_HOSTNAME]}
                </Typography>
                <Typography color={secondaryText} sm px={1}>
                  {activeNetwork[SECURE_IP]}
                </Typography>
              </Stack>
            </View>
            <View
              style={{
                height: "100%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BannerLogo />
            </View>
          </Stack>
        </LinearGradient>
      </Stack>

      <ScrollView contentContainerStyle={{ gap: 30, paddingHorizontal: 8 }}>
        <MonitoringSection data={data} />

        <View style={{ gap: 20 }}>
          <Typography bold lg px={1} color={headerText}>
            View Hardware Status
          </Typography>

          <Stack row wrap style={{ justifyContent: "space-between", gap: 12 }} justify="flex-start">
            {LinkButtonList.map(({ id, title, icon, to }) => (
              <LinkButton key={id} gap={3} icon={icon} title={title} onPress={() => navigate(to)} />
            ))}
          </Stack>
        </View>

        <View style={{ gap: 20 }}>
          <Typography bold lg px={1} color={headerText}>
            Execute Operation
          </Typography>
          <Stack row wrap gap={3} justify="flex-start">
            {CmdButtonList.map(({ id, title, icon, to }) => (
              // <LinkButton key={id} gap={3} icon={icon} title={title} onPress={() => navigate(to)} />
              <LinkButton
                key={id}
                gap={3}
                icon={icon}
                title={title}
                onPress={() => ToastAndroid.show("Not Implemented Yet.", ToastAndroid.SHORT)}
              />
            ))}
          </Stack>
        </View>
      </ScrollView>
    </Stack>
  );
};

interface MonitoringSectionProps {
  data: {
    cpu_data: CpuStatusScreenProps;
    memory_data: MemStatusScreenProps;
  };
}

const MonitoringSection = ({ data }: MonitoringSectionProps) => {
  // CPU
  const speed = data?.cpu_data?.cpu?.speed || 0;
  const temperature = data?.cpu_data?.cpuTemperature.main || 0;
  const currentLoad = data?.cpu_data?.currentLoad?.currentLoad || 0;

  // MEMORY
  const mem = data?.memory_data?.mem;
  const memAvailable = (mem?.available / mem?.total) * 100;
  const memUsed = 100 - memAvailable;
  const swapAvailable = (mem?.swapfree / mem?.swaptotal) * 100;
  const swapUsed = 100 - swapAvailable;

  // HOOKS
  const { headerText } = useTheme();
  const { width } = useWindowDimensions();

  return (
    <View style={{ gap: 20 }}>
      <Typography bold lg px={1} color={headerText}>
        Overview
      </Typography>

      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>CPU</Text>
          <View>
            <CircularProgress
              pgColor={currentLoad > 50 ? "#DB4437" : Color.primary}
              progressPercent={currentLoad}
              size={140}
              strokeWidth={15}
              textColor=""
              textSize={12}
              text={`${currentLoad.toFixed(2)}%`}
            />
            <Stack row justify="center" gap={2}>
              <Text>{speed} GHz</Text>
              {temperature ? <Text>{temperature}</Text> : <></>}
            </Stack>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>MEMORY</Text>
          <View style={{ flex: 1, gap: 5, justifyContent: "space-around" }}>
            <View style={{ gap: 4 }}>
              <Text style={{ width: "100%", textAlign: "center" }}>
                P : {meterConvert(mem?.total - mem?.available)} / {meterConvert(mem?.total)}
              </Text>
              <LinearProgress
                width={width * 0.4}
                height={20}
                strokeWidth={2}
                text={`${memUsed.toFixed(2)}%`}
                progressPercent={memUsed}
                pgColor={Color.primary}
                textColor="#333333"
              />
            </View>

            <View style={{ gap: 4 }}>
              <Text style={{ width: "100%", textAlign: "center" }}>
                S : {meterConvert(mem?.swaptotal - mem?.swapfree)} / {meterConvert(mem?.swaptotal)}
              </Text>
              <LinearProgress
                width={width * 0.4}
                height={20}
                strokeWidth={2}
                text={`${swapUsed.toFixed(2)}%`}
                progressPercent={swapUsed}
                pgColor={Color.red}
                textColor="#333333"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    elevation: 10,
    borderRadius: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },

  box: {
    // flex: 1,
    gap: 30,
    padding: 15,
    alignItems: "center",
  },
});

type LinkButtonListType = {
  id: string;
  title: string;
  to: string;
  icon: JSX.Element;
};

const LinkButtonList: LinkButtonListType[] = [
  {
    id: "link-button-1",
    to: "cpu",
    title: "CPU",
    icon: <Feather name="cpu" size={36} color={Color.contrastText} />,
  },
  {
    id: "link-button-2",
    title: "Memory",
    to: "memory",
    icon: <FontAwesome5 name="memory" size={32} color="#fff" />,
  },
  {
    id: "link-button-3",
    title: "Network",
    to: "network",
    icon: <MaterialIcons name="network-check" size={36} color={Color.contrastText} />,
  },
  {
    id: "link-button-4",
    title: "Disk",
    to: "disk",
    icon: <MaterialCommunityIcons name="harddisk" size={36} color={Color.contrastText} />,
  },
  {
    id: "link-button-5",
    title: "Processes",
    to: "process",
    icon: <FontAwesome name="gears" size={36} color={Color.contrastText} />,
  },
];

const CmdButtonList: LinkButtonListType[] = [
  {
    id: "cmd-button-1",
    to: "power",
    title: "Power Command",
    icon: <Feather name="power" size={36} color="#fff" />,
  },
  {
    id: "cmd-button-2",
    title: "Kill Process",
    to: "kill-process",
    icon: <FontAwesome name="gears" size={36} color={Color.contrastText} />,
  },
];
