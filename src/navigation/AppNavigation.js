import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'; // Thêm để dùng cho Home tạm thời
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContext } from '../context/AppContext';

// Import các màn hình của bạn
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignInScreen from '../screens/SignInScreen';
import NumberScreen from '../screens/NumberScreen';
import VerificationScreen from '../screens/VerificationScreen';
import LocationScreen from '../screens/LocationScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

// Tạo nhanh màn hình Home tạm thời để kiểm tra đăng nhập thành công
const TempHomeScreen = () => {
  const { logout } = useContext(AppContext);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#53B175' }}>Nectar Store</Text>
      <Text style={{ fontSize: 16, marginVertical: 10 }}>Bạn đã đăng nhập thành công!</Text>
      <TouchableOpacity 
        onPress={logout} 
        style={{ marginTop: 20, padding: 15, backgroundColor: '#ff4444', borderRadius: 10 }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Đăng xuất (Test)</Text>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createStackNavigator();

export default function AppNavigation() {
  const { isLoading, isLoggedIn, isFirstLaunch } = useContext(AppContext);

  // 1. Nếu đang tải (đọc AsyncStorage), hiện Splash
  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunch ? (
          // 2. Nếu lần đầu mở app: Hiện Onboarding
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : !isLoggedIn ? (
          // 3. Nếu chưa đăng nhập: Hiện cụm Auth (SignIn -> Number -> ... -> Login)
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Number" component={NumberScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="Location" component={LocationScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          // 4. Nếu đã đăng nhập thành công: Hiện màn hình chính (Home)
          // Quan trọng: Phải đặt tên khác với "SignIn" để tránh lỗi navigate
          <Stack.Screen name="Home" component={TempHomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}