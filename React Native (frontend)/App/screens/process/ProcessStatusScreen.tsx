import { StyleSheet, View } from "react-native";
import React from "react";
import { ProcessStatusScreenProps } from "../../common/types";
import { Color } from "../../Theme/Color";
import Typography from "../../components/Typography";
import Stack from "../../components/Stack";
import { DataTable } from "react-native-paper";
import { meterConvert } from "../../helper/functions";

const ProcessStatusScreen = ({ data: items }: ProcessStatusScreenProps) => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([12, 25, 50]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title numeric>PID</DataTable.Title>
        <DataTable.Title numeric>CPU</DataTable.Title>
        <DataTable.Title numeric>MEM</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map(({ name, cpu, mem, pid }: any, i) => (
        <DataTable.Row key={i}>
          <DataTable.Cell>{name}</DataTable.Cell>
          <DataTable.Cell numeric>{pid}</DataTable.Cell>
          <DataTable.Cell numeric>{cpu.toFixed(1)}</DataTable.Cell>
          <DataTable.Cell numeric>{meterConvert(mem * 1024 * 1024)}</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={"Rows per page"}
      />
    </DataTable>
  );
};

export default ProcessStatusScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 5,
  },
  hr: {
    borderBottomWidth: 0.5,
  },
  Typography: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    color: Color.primary,
  },
});
