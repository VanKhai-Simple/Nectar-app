import { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

export const useStorage = (key, initialValue = null) => {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await storageService.get(key);
      if (result !== null) setData(result);
      setLoading(false);
    };
    loadData();
  }, [key]);

  // Hàm này giúp bạn vừa cập nhật State, vừa tự động mã hóa lưu vào máy
  const updateData = async (newValue) => {
    setData(newValue);
    await storageService.save(key, newValue);
  };

  return [data, updateData, loading]; 
};