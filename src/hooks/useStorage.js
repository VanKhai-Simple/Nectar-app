import { useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

export const useStorage = (key) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await storageService.get(key);
      setData(result);
      setLoading(false);
    };
    loadData();
  }, [key]);

  return { data, loading };
};