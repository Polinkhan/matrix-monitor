import * as SecureStore from "expo-secure-store";

const updateNetworkData = async (newData: any) => {
  return new Promise(async (resolve, reject) => {
    const data = await SecureStore.getItemAsync("networks");
    const parsedData: Array<object> = data ? JSON.parse(data) : [];
    if (parsedData.some(({ URL }: any) => URL === newData.URL)) {
      reject("Network already added");
    } else {
      parsedData.push(newData);
      // await SecureStore.setItemAsync("activeNetwork", JSON.stringify(newData));
      await SecureStore.setItemAsync("networks", JSON.stringify(parsedData));
      resolve(true);
    }
  });
};

const meterConvert = (bytes: number) => {
  if (!bytes) return 0;

  if (bytes < 1024) return `${bytes.toFixed(2)} B`;
  else if (bytes < 1048576) return `${(bytes / 1024).toFixed(2)} KB`;
  else if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(2)} MB`;
  else return `${(bytes / 1073741824).toFixed(2)} GB`;
};

export { meterConvert, updateNetworkData };
