import { StyleSheet } from "react-native";
import React from "react";
import Stack from "../../components/Stack";
import { useDataContext } from "../../contexts/DataContext";
import Typography from "../../components/Typography";

const KillProcessScreen = () => {
  const { activeNetwork } = useDataContext();

  const handlePress = async (cmd: string, onSuccess: string) => {};

  return (
    <Stack gap={4} justify="center" align="center" style={{ flex: 1 }}>
      <Typography lg>Not Implemented Yet</Typography>
    </Stack>
  );
};
``;
export default KillProcessScreen;

const styles = StyleSheet.create({});
