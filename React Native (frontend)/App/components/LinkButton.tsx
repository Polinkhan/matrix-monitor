import { ButtonProps, StyleSheet, Text, TouchableOpacity, useWindowDimensions } from "react-native";
import React from "react";
import { Entypo, Feather } from "@expo/vector-icons";
import { Color } from "../Theme/Color";
import Stack from "./Stack";
import Typography from "./Typography";
import useTheme from "../hooks/use-theme";

interface LinkButtonProps extends ButtonProps {
  icon?: any;
  gap?: number;
}

const LinkButton = ({ title, gap, onPress, icon }: LinkButtonProps) => {
  const { primaryText } = useTheme();

  gap = gap || 0;

  const { width } = useWindowDimensions();
  const LinkButtonWidth = width - (32 + 3 * 8 * gap);
  return (
    <Stack gap={1} align="center" style={{ width: LinkButtonWidth / 4 }}>
      <TouchableOpacity activeOpacity={0.8} style={styles.linkBtn} onPress={onPress}>
        {icon}
      </TouchableOpacity>
      <Typography sm bold color={primaryText}>
        {title}
      </Typography>
    </Stack>
  );
};

export default LinkButton;

const styles = StyleSheet.create({
  linkBtn: {
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
    borderRadius: 10,
    backgroundColor: Color.primary,
  },
});
