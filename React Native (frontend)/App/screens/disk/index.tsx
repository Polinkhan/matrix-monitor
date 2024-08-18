import React from "react";
import Loading from "../../components/Loading";
import BodyLayout from "../../layout/BodyLayout";
import DiskStatusScreen from "./DiskStatusScreen";
import useSocket from "../../hooks/use-socket";

const Disk = ({ navigation }: any) => {
  const { data }: any = useSocket({ type: "disk" });

  if (!data) return <Loading />;

  return (
    <BodyLayout>
      <DiskStatusScreen data={data} />
    </BodyLayout>
  );
};

export default Disk;
