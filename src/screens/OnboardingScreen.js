import React, { useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, StatusBar } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function OnboardingScreen({ navigation }) {
  const { completeOnboarding } = useContext(AppContext);

  const handleGetStarted = () => {
    // CHỈ CẦN dòng này thôi! 
    // Khi isFirstLaunch đổi thành false, AppNavigation sẽ tự động render SignInScreen.
    completeOnboarding();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ImageBackground 
        source={require('../assets/onboarding_bg.png')} 
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Image 
            source={require('../assets/white_carrot.png')} 
            style={styles.icon} 
            resizeMode="contain"
          />
          
          <Text style={styles.title}>Welcome{"\n"}to our store</Text>
          <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1, justifyContent: 'flex-end' },
  overlay: {
    paddingHorizontal: 30,
    paddingBottom: 90, // Tăng padding để đẩy nội dung lên cao chút cho đẹp
    alignItems: 'center',
    // Gradient giả bằng rgba để chữ trắng dễ đọc hơn trên nền ảnh
    backgroundColor: 'rgba(0,0,0,0.3)', 
  },
  icon: { width: 48, height: 56, marginBottom: 15 },
  title: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 55,
  },
  subtitle: {
    color: '#FCFCFC',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 40, // Khoảng cách đến nút bấm
  },
  button: {
    backgroundColor: '#53B175',
    width: '100%',
    paddingVertical: 20,
    borderRadius: 19,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' }
});