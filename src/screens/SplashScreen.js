import React from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image 
        source={require('../assets/logo_nectar.png')} 
        style={styles.logo} 
        resizeMode="contain" 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#53B175', // Màu xanh Nectar
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '60%',
  }
});