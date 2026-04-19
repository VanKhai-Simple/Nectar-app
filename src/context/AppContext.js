import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [cart, setCart] = useState([]);

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
      setCart([]);
      console.log("Đã đăng xuất và reset Onboarding thành công!");
    } catch (e) {
      console.log("Lỗi khi reset app:", e);
    }
  };

  // --- THÊM HÀM THÊM VÀO GIỎ ---
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Kiểm tra sản phẩm đã tồn tại chưa
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // Nếu có rồi thì tăng số lượng
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Nếu chưa có thì thêm mới với số lượng là 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Trong AppProvider của AppContext.js thêm:
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const isExist = prev.find(item => item.id === product.id);
      if (isExist) {
        return prev.filter(item => item.id !== product.id); // Bỏ thích
      }
      return [...prev, product]; // Thêm thích
    }); 
  };

  // --- THÊM HÀM TĂNG/GIẢM/XÓA (Để dùng cho màn MyCart) ---
  const updateQuantity = (id, type) => {
    setCart((prevCart) => 
      prevCart.map(item => {
        if (item.id === id) {
          const newQty = type === 'inc' ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  return (
    <AppContext.Provider 
      value={{ 
        isLoading, 
        isLoggedIn, 
        isFirstLaunch, 
        completeOnboarding, 
        login, 
        logout ,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        favorites,
        toggleFavorite
      }}
    >
      {children}
    </AppContext.Provider>
  );
};