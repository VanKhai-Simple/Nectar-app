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

        if (firstLaunch === null) {
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }

        if (loginStatus !== null) {
          setIsLoggedIn(JSON.parse(loginStatus));
        }
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };
    checkStatus();
  }, []);

  // --- THÊM CÁC HÀM NÀY ---

  // Hàm xử lý đăng nhập
  const login = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } catch (e) {
      console.log("Lỗi khi login:", e);
    }
  };

  // Hàm xử lý đăng xuất (nếu cần dùng ở màn Profile sau này)
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
    } catch (e) {
      console.log("Lỗi khi logout:", e);
    }
  };

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("alreadyLaunched", "true");
    setIsFirstLaunch(false);
  };

  return (
    // Bổ sung 'login' và 'logout' vào value bên dưới
    <AppContext.Provider 
      value={{ 
        isLoggedIn, 
        setIsLoggedIn, 
        isFirstLaunch, 
        completeOnboarding, 
        isLoading,
        login, 
        logout 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};