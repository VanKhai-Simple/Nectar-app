import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

const SECRET_KEY = "Nectar_Secret_Key_2026";

export const storageService = {
  save: async (key, value) => {
    try {
      const jsonString = JSON.stringify(value);
      const encrypted = CryptoJS.AES.encrypt(jsonString, SECRET_KEY).toString();
      
      console.log(`\n=== 💾 ĐANG LƯU [${key}] ===`);
      console.log(`- Gốc:`, value);
      console.log(`- Đã mã hóa: ${encrypted.substring(0, 50)}...`); 
      
      await AsyncStorage.setItem(key, encrypted);
    } catch (e) { 
      console.error("Lỗi Save:", e); 
    }
  },

  get: async (key) => {
    try {
      const ciphertext = await AsyncStorage.getItem(key);
      if (!ciphertext) return null;

      const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
      const decryptedStr = bytes.toString(CryptoJS.enc.Utf8);

      // Kiểm tra xem có giải mã ra nội dung không (tránh lỗi dữ liệu cũ chưa mã hóa)
      if (!decryptedStr) {
        console.log(`\n=== ⚠️ [${key}] Giải mã thất bại (Có thể là dữ liệu cũ chưa mã hóa) ===`);
        return null;
      }

      const finalData = JSON.parse(decryptedStr);

      console.log(`\n=== 📖 ĐANG ĐỌC [${key}] ===`);
      console.log(`- Dữ liệu thô: ${ciphertext.substring(0, 50)}...`);
      console.log(`- Giải mã thành công:`, finalData);

      return finalData;
    } catch (e) {
      console.log(`\n=== ❌ Lỗi đọc key [${key}]:`, e.message);
      return null; 
    }
  },
      
  remove: async (key) => {
    console.log(`\n=== 🗑️ ĐÃ XÓA [${key}] ===`);
    await AsyncStorage.removeItem(key);
  }
};