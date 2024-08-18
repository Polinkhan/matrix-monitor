import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import loading from "../assets/loading.json";
import { useWindowDimensions } from "react-native";

const Loading = () => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20 }}>Retriving Data ...</Text>
      <ActivityIndicator color={"#000"} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
