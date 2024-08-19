import { StyleSheet, Text, View } from "react-native";
import React from "react";
import HomeScreen from "./HomeScreen";
import MainLayout from "../../layout/MainLayout";
import useSocket from "../../hooks/use-socket";

const Home = (props: any) => {
  // hooks
  const { data: cpu_data }: any = useSocket({ type: "cpu" });
  const { data: memory_data }: any = useSocket({ type: "memory" });

  const data = { cpu_data, memory_data };

  return (
    <MainLayout>
      <HomeScreen {...props} data={data} />
    </MainLayout>
  );
};

export default Home;
