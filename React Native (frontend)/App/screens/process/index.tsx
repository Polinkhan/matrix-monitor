import React from "react";
import Loading from "../../components/Loading";
import BodyLayout from "../../layout/BodyLayout";
import ProcessStatusScreen from "./ProcessStatusScreen";
import useSocket from "../../hooks/use-socket";

const Process = ({ navigation }: any) => {
  const { data } = useSocket({ type: "services" });

  if (!data) return <Loading />;

  return (
    <BodyLayout>
      <ProcessStatusScreen data={data} />
    </BodyLayout>
  );
};

export default Process;
