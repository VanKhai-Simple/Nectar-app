import React, { useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, StatusBar } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function OnboardingScreen({ navigation }) {
  const { completeOnboarding } = useContext(AppContext);

  const handleGetStarted = () => {
    // 1. Gọi hàm này để lưu vào AsyncStorage là đã xem Onboarding
    completeOnboarding();
    // 2. Chuyển sang màn hình SignIn
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground 
        source={require('../assets/onboarding_bg.png')} // Ảnh anh shipper
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Image 
            source={require('../assets/white_carrot.png')} // Icon cà rốt trắng
            style={styles.icon} 
          />
          
          <Text style={styles.title}>Welcome{"\n"}to our store</Text>
          <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleGetStarted}
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
    paddingBottom: 60,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)', // Làm tối ảnh một chút để nổi chữ
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
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#53B175',
    width: '100%',
    paddingVertical: 20,
    borderRadius: 19,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' }
});