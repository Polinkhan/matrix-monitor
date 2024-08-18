import React from "react";
import Loading from "../../components/Loading";
import useSocket from "../../hooks/use-socket";
import BodyLayout from "../../layout/BodyLayout";
import MemoryStatusScreen from "./MemoryStatusScreen";

const Memory = () => {
  const { data }: any = useSocket({ type: "memory" });

  if (!data) return <Loading />;

  return (
    <BodyLayout>
      <MemoryStatusScreen data={data} />
    </BodyLayout>
  );
};

export default Memory;
