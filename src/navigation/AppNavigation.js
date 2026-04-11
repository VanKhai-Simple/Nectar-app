import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContext } from '../context/AppContext';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import SignInScreen from '../screens/SignInScreen';
import NumberScreen from '../screens/NumberScreen';
import VerificationScreen from '../screens/VerificationScreen';
import LocationScreen from '../screens/LocationScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator();

export default function AppNavigation() {
  const { isLoading, isLoggedIn, isFirstLaunch } = useContext(AppContext);

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isFirstLaunch ? (
          // Luồng giới thiệu (Chỉ hiện lần đầu)
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : !isLoggedIn ? (
          // Luồng đăng nhập/đăng ký (Auth Stack)
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="Number" component={NumberScreen} />
            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="Location" component={LocationScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : (
          // Luồng ứng dụng chính (Main Stack) sau khi login = true
          <Stack.Screen name="SignIn" component={SignInScreen} /> // Tạm thời để SignIn
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}