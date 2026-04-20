import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "crypto-js";
import { storageService } from '../services/storageService';
import Toast from '../components/Toast';

export const AppContext = createContext();

const SECRET_KEY = "Nectar_Secret_Key_2026"; // Khóa để mã hóa dữ liệu

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]); // Quản lý đơn hàng

  // --- UTILS: MÃ HÓA & GIẢI MÃ ---
  const encryptData = (data) => CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
  const decryptData = (ciphertext) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) { return null; }
  };

  const placeOrder = async (cartItems, totalAmount) => {
    try {
      // 1. Tạo đơn hàng mới
      const newOrder = {
        id: "ORD" + Math.floor(Math.random() * 10000), 
        date: new Date().toISOString(),
        items: [...cartItems], // Copy danh sách sản phẩm
        total: totalAmount,
        status: 'Delivered'
      };

      // 2. Cập nhật vào State 'orders'
      // Khi State này thay đổi, cái useEffect [orders] ở phía dưới 
      // của bạn sẽ tự động mã hóa và lưu vào AsyncStorage giúp bạn.
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
      
      // 3. Xóa giỏ hàng trong State
      // Tương tự, useEffect [cart] sẽ tự động lưu giỏ hàng trống vào máy.
      setCart([]); 
      
      return true;
    } catch (error) {
      console.log("Lỗi đặt hàng chi tiết:", error);
      return false;
    }
  };

  // --- 1. KHỞI CHẠY APP (AUTO LOGIN & LOAD DATA) ---
  useEffect(() => {
    const initApp = async () => {
      
      try {
        const firstLaunch = await AsyncStorage.getItem("alreadyLaunched");
        
        // DÙNG storageService để lấy dữ liệu (Nó sẽ tự chạy Console.log cho bạn)
        const auth = await storageService.get("userAuth");
        const cartData = await storageService.get("userCart");
        const ordersData = await storageService.get("userOrders");

        setIsFirstLaunch(firstLaunch === null);

        if (auth) {
          const now = Date.now();
          if (now - auth.loginAt < 24 * 60 * 60 * 1000) {
            setIsLoggedIn(true);
          } else {
            await logout(); 
          }
        }

        if (cartData) setCart(cartData);
        if (ordersData) setOrders(ordersData);

      } catch (e) {
        console.error("Lỗi load dữ liệu:", e);
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };
    initApp();
  }, []);

  // --- 2. TỰ ĐỘNG LƯU (Dùng storageService để MÃ HÓA và hiện LOG) ---
  useEffect(() => {
    if (!isLoading) {
      storageService.save("userCart", cart); 
    }
  }, [cart]);

  useEffect(() => {
    if (!isLoading) {
      storageService.save("userOrders", orders);
    }
  }, [orders]);

  // --- 3. LOGIN (Dùng storageService) ---
  const login = async (userData = {}) => {
    const authData = { ...userData, loginAt: Date.now() };
    // Lưu thông qua service để kích hoạt mã hóa + console.log
    await storageService.save("userAuth", authData);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await storageService.remove("userAuth");
      await storageService.remove("userCart");
      await storageService.remove("userOrders");
      setIsLoggedIn(false);
      setCart([]);
      setOrders([]);
      setIsFirstLaunch(true);
    } catch (e) { console.log(e); }
  };

  const completeOnboarding = async () => {
      await AsyncStorage.setItem("alreadyLaunched", "true");
      setIsFirstLaunch(false);
    };


  const [toastConfig, setToastConfig] = useState({
    visible: false,
    message: '',
    bgColor: '#53B175'
  });

  const showToast = (message, bgColor = '#53B175') => {
    setToastConfig({ visible: true, message, bgColor });
  };

  const hideToast = () => {
    setToastConfig(prev => ({ ...prev, visible: false }));
  };

  // --- 4. CHỨC NĂNG GIỎ HÀNG ---
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // TỰ ĐỘNG HIỆN TOAST KHI THÊM THÀNH CÔNG
    showToast(`Đã thêm ${product.name} vào giỏ hàng! 🛒`);
  };

  const updateQuantity = (id, type) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // --- 5. CHỨC NĂNG ĐƠN HÀNG (CHECKOUT) ---
  const checkout = async () => {
    if (cart.length === 0) return;
    const newOrder = {
      id: "ORD" + Date.now(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      time: new Date().toLocaleString("vi-VN"),
    };
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Đặt xong thì sạch giỏ
    return true;
  };

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      return isExist ? prev.filter((item) => item.id !== product.id) : [...prev, product];
    });
  };

  return (
    <AppContext.Provider
      value={{
        isLoading, isLoggedIn, isFirstLaunch,
        completeOnboarding, login, logout,
        cart, addToCart, updateQuantity, removeFromCart,
        favorites, toggleFavorite,
        orders, checkout,placeOrder,
        toastConfig, showToast, hideToast
      }}
    >
      <Toast 
        message={toastConfig.message}
        visible={toastConfig.visible}
        bgColor={toastConfig.bgColor}
        onHide={hideToast}
      />
      {children}
    </AppContext.Provider>
  );
};