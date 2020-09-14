import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log('erro na hora de salvar a informacao: ' + e);
  }
};

export const getData = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log('erro na hora de pergar a informacao:' + e);
  }
};
