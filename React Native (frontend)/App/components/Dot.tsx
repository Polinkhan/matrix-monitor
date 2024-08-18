import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Color } from "../Theme/Color";

const Dot = ({ size }: { size?: number }) => {
  return (
    <View
      style={{ width: size || 16, height: size || 16, backgroundColor: Color.primary, borderRadius: 0, elevation: 2 }}
    />
  );
};

export default Dot;

const styles = StyleSheet.create({});
