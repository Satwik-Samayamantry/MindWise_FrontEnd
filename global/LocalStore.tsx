import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
    //   console.log(jsonValue)
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };
  
const getData = async (key) => {
try {
    const jsonValue = await AsyncStorage.getItem(key);
    //   console.log(JSON.parse(jsonValue))
      return await JSON.parse(jsonValue);
} catch (error) {
    console.log(error);
}
};

const deleteData = async(key) => {
  try {
    await AsyncStorage.removeItem(key);
} catch (error) {
    console.log(error);
}
};
  
export {storeData,getData,deleteData};