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
        // Giả lập delay 2s để hiện màn hình Splash cho đẹp
        setTimeout(() => setIsLoading(false), 2000);
      }
    };
    checkStatus();
  }, []);

  const completeOnboarding = async () => {
    await AsyncStorage.setItem("alreadyLaunched", "true");
    setIsFirstLaunch(false);
  };

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, isFirstLaunch, completeOnboarding, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};