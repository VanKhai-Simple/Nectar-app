import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContext } from '../context/AppContext';

import TabNavigator from './TabNavigator';
// Import các màn hình của bạn
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignInScreen from '../screens/SignInScreen';
import NumberScreen from '../screens/NumberScreen';
import VerificationScreen from '../screens/VerificationScreen';
import LocationScreen from '../screens/LocationScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import BeveragesScreen from '../screens/BeveragesScreen';
import SearchScreen from '../screens/SearchScreen';
import ExploreScreen from '../screens/ExploreScreen';
import FilterScreen from '../screens/FilterScreen';
import ProfileScreen from '../screens/ProfileScreen';
// Không cần import FavoriteScreen và MyCart ở đây nếu bạn chỉ dùng chúng trong TabNavigator
// Nhưng nếu muốn mở chúng từ một chỗ khác mà không hiện Tab, thì cứ giữ lại.

const Stack = createStackNavigator();

export default function AppNavigation() {
  const { isLoading, isLoggedIn, isFirstLaunch } = useContext(AppContext);

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunch ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : !isLoggedIn ? (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Number" component={NumberScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="Location" component={LocationScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            
          </>
        ) : (
          <>
            {/* 1. Màn hình chính có Tab */}
            <Stack.Screen name="MainTabs" component={TabNavigator} />
            
            {/* 2. Các màn hình phụ */}
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Beverages" component={BeveragesScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Explore" component={ExploreScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />

            {/* Cập nhật Filter ở đây để nó hiện dạng Modal */}
            <Stack.Screen 
              name="Filter" 
              component={FilterScreen} 
              options={{ 
                presentation: 'modal', // Trượt từ dưới lên (iOS)
                animation: 'slide_from_bottom', // Hiệu ứng cho Android
              }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}