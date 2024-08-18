import { ScrollView, StyleSheet, Text, Touchable, View } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { SECURE_IP } from "../../common/config";
import MainLayout from "../../layout/MainLayout";
import ListScreen from "./ListScreen";

const List = (props: any) => {
  return (
    <MainLayout>
      <ListScreen {...props} />
    </MainLayout>
  );
};

export default List;

const styles = StyleSheet.create({});
