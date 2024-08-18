import { useCallback, useState } from "react";

const useScrollviewRefresh = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback((callback?: Function, autoOff = true) => {
    setRefreshing(true);
    callback && callback();
    autoOff && setTimeout(() => setRefreshing(false), 2000);
  }, []);

  return { refreshing, onRefresh, setRefreshing };
};

export default useScrollviewRefresh;
