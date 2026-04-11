import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const firstLaunch = await AsyncStorage.getItem("alreadyLaunched");
        const loginStatus = await AsyncStorage.getItem("isLoggedIn");

        setIsFirstLaunch(firstLaunch === null);
        setIsLoggedIn(loginStatus === "true");
      } catch (e) {
        console.error(e);
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };
    checkStatus();
  }, []);

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem("alreadyLaunched", "true");
      setIsFirstLaunch(false);
    } catch (e) {
      console.log(e);
    }
  };

  const login = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  // --- HÀM LOGOUT MỚI THEO Ý BẠN ---
  const logout = async () => {
    try {
      // 1. Xóa sạch dấu vết trong bộ nhớ máy
      await AsyncStorage.multiRemove(["isLoggedIn", "alreadyLaunched"]);
      
      // 2. Cập nhật State để UI tự động nhảy về Onboarding
      setIsLoggedIn(false);
      setIsFirstLaunch(true); 
      
      console.log("Đã đăng xuất và reset Onboarding thành công!");
    } catch (e) {
      console.log("Lỗi khi reset app:", e);
    }
  };

  return (
    <AppContext.Provider 
      value={{ 
        isLoading, 
        isLoggedIn, 
        isFirstLaunch, 
        completeOnboarding, 
        login, 
        logout 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};