import React from "react";
import Loading from "../../components/Loading";
import BodyLayout from "../../layout/BodyLayout";
import NetworkStatusScreen from "./NetworkStatusScreen";
import useSocket from "../../hooks/use-socket";

const Network = () => {
  const { data }: any = useSocket({ type: "network" });

  if (!data) return <Loading />;

  return (
    <BodyLayout>
      <NetworkStatusScreen data={data} />
    </BodyLayout>
  );
};

export default Network;
