import React from "react";
import Loading from "../../components/Loading";
import useSocket from "../../hooks/use-socket";
import CpuStatusScreen from "./CpuStatusScreen";
import BodyLayout from "../../layout/BodyLayout";

const Cpu = () => {
  const { data }: any = useSocket({ type: "cpu" });

  if (!data) return <Loading />;

  return (
    <BodyLayout>
      <CpuStatusScreen data={data} />
    </BodyLayout>
  );
};

export default Cpu;
