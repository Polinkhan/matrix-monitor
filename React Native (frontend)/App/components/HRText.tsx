import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Color } from "../Theme/Color";

const HRText = ({ children }: any) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
      <View style={styles.hr} />
      <Text style={styles.text}>{children}</Text>
      <View style={styles.hr} />
    </View>
  );
};

export default HRText;

const styles = StyleSheet.create({
  hr: {
    flex: 1,
    height: 3,
    borderBottomWidth: 1,
    borderColor: Color.primary,
    borderTopWidth: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: Color.primary,
  },
});
