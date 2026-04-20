import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'key-sieu-dai'; // Nên để trong file .env

export const storageService = {
  // Hàm mã hóa và lưu
  async save(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      const encryptedValue = CryptoJS.AES.encrypt(jsonValue, SECRET_KEY).toString();
      await AsyncStorage.setItem(key, encryptedValue);
    } catch (e) {
      console.error("Save error:", e);
    }
  },

  // Hàm giải mã và lấy dữ liệu
  async get(key) {
    try {
      const encryptedValue = await AsyncStorage.getItem(key);
      if (!encryptedValue) return null;
      
      const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedData);
    } catch (e) {
      console.error("Get error:", e);
      return null;
    }
  },

  async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error("Remove error:", e);
    }
  }
};