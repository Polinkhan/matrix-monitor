import { ScrollView, ToastAndroid, View } from "react-native";
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
import { NetworkProps } from "../../common/types";
import { SECURE_HOSTNAME, SECURE_IP } from "../../common/config";

const HomeScreen = ({ navigation }: any) => {
  const { secondaryText, headerText } = useTheme();
  const [activeNetwork, setActiveNetwork] = useState<NetworkProps>();

  const navigate = (path: string, shouldHaveActiveNetwork = true) => {
    navigation.navigate(path);
  };

  useEffect(() => {
    SECURE_STORE.GET_ACTIVE_NETWORK().then((data: NetworkProps) => {
      setActiveNetwork(data);
    });
  }, []);

  if (!activeNetwork) return;

  return (
    <Stack gap={3}>
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

      <Stack row>
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

      <ScrollView contentContainerStyle={{ gap: 16 }}>
        <Typography bold lg px={1} color={headerText}>
          View Hardware Status
        </Typography>

        <Stack row wrap style={{ justifyContent: "space-between", gap: 12 }} justify="flex-start">
          {LinkButtonList.map(({ id, title, icon, to }) => (
            <LinkButton key={id} gap={3} icon={icon} title={title} onPress={() => navigate(to)} />
          ))}
        </Stack>

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
      </ScrollView>
    </Stack>
  );
};

export default HomeScreen;

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
