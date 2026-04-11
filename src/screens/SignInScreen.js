import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function SignInScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Image 
        source={require('../assets/signin_banner.png')} // Ảnh rau củ
        style={styles.banner}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Get your groceries{"\n"}with nectar</Text>

        {/* Ô nhập số điện thoại giả (Bấm vào sẽ sang màn hình Number) */}
        <TouchableOpacity 
          style={styles.phoneInput} 
          onPress={() => navigation.navigate('Number')}
        >
          <Image source={require('../assets/flag_bd.png')} style={styles.flag} />
          <Text style={styles.phoneText}>+880</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or connect with social media</Text>

        <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#5383EC' }]}>
          <Image source={require('../assets/google_icon.png')} style={styles.icon} />
          <Text style={styles.socialText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialBtn, { backgroundColor: '#4A66AC', marginTop: 15 }]}>
          <Image source={require('../assets/facebook_icon.png')} style={styles.icon} />
          <Text style={styles.socialText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  banner: { width: '100%', height: 300 },
  content: { padding: 25 },
  title: { fontSize: 26, fontWeight: '600', marginBottom: 25 },
  phoneInput: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E2E2E2', 
    paddingBottom: 10,
    marginBottom: 35
  },
  flag: { width: 30, height: 20, marginRight: 15 },
  phoneText: { fontSize: 18 },
  orText: { textAlign: 'center', color: '#828282', marginBottom: 35 },
  socialBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20, 
    borderRadius: 19 
  },
  socialText: { color: '#fff', fontSize: 18, fontWeight: '600', marginLeft: 10 },
  icon: { width: 22, height: 22 }
});