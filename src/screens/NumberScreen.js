import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Hoặc thư viện icon bạn dùng

export default function NumberScreen({ navigation }) {
  const [number, setNumber] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Nút Back */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Enter your mobile number</Text>
        
        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.inputRow}>
          <Image source={require('../assets/flag_bd.png')} style={styles.flag} />
          <Text style={styles.countryCode}>+880</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            autoFocus={true}
            value={number}
            onChangeText={setNumber}
          />
        </View>
      </View>

      {/* Nút Next tròn màu xanh */}
      <TouchableOpacity 
        style={[styles.nextBtn, { opacity: number.length > 5 ? 1 : 0.5 }]}
        onPress={() => { /* Chuyển sang màn Verification */ }}
      >
        <Ionicons name="chevron-forward" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backBtn: { padding: 20 },
  content: { paddingHorizontal: 25, marginTop: 20 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 30 },
  label: { color: '#7C7C7C', fontSize: 16 },
  inputRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E2E2E2', 
    paddingVertical: 10 
  },
  flag: { width: 30, height: 20, marginRight: 10 },
  countryCode: { fontSize: 18, marginRight: 10 },
  input: { flex: 1, fontSize: 18 },
  nextBtn: {
    position: 'absolute',
    right: 25,
    bottom: 50, // Điều chỉnh tùy theo vị trí bàn phím
    backgroundColor: '#53B175',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Đổ bóng cho Android
    shadowColor: '#000', // Đổ bóng cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  }
});