import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function VerificationScreen({ navigation }) {
  const [code, setCode] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Enter your 4-digit code</Text>
        <Text style={styles.label}>Code</Text>
        <TextInput
          style={styles.input}
          placeholder="- - - -"
          keyboardType="numeric"
          maxLength={4}
          value={code}
          onChangeText={setCode}
        />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity>
          <Text style={styles.resend}>Resend Code</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.nextBtn}
          onPress={() => navigation.navigate('Location')}
        >
          <Ionicons name="chevron-forward" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backBtn: { padding: 20 },
  content: { paddingHorizontal: 25 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 20 },
  label: { color: '#7C7C7C', fontSize: 16 },
  input: { borderBottomWidth: 1, borderBottomColor: '#E2E2E2', fontSize: 22, paddingVertical: 10, letterSpacing: 10 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, marginTop: 40 },
  resend: { color: '#53B175', fontSize: 16 },
  nextBtn: { backgroundColor: '#53B175', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }
});