import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreen from "./HomeScreen";
import MainLayout from "../../layout/MainLayout";

const Home = (props: any) => {
  return (
    <MainLayout>
      <HomeScreen {...props} />
    </MainLayout>
  );
};

export default Home;
