import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Image source={require('../assets/orange_carrot.png')} style={styles.logo} />
        
        <View style={styles.header}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Enter your credentials to continue</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.input} placeholder="Afsar Hossen Shuvo" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="imshuvo97@gmail.com" 
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput 
              style={[styles.input, { flex: 1, borderBottomWidth: 0 }]} 
              secureTextEntry={!showPassword} 
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#7C7C7C" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.terms}>
          By continuing you agree to our <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy.</Text>
        </Text>

        <TouchableOpacity style={styles.mainBtn} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  logo: { alignSelf: 'center', marginTop: 30, marginBottom: 40, width: 30, height: 35 },
  header: { marginBottom: 30 },
  title: { fontSize: 26, fontWeight: '600', color: '#181725' },
  subtitle: { color: '#7C7C7C', marginTop: 5, fontSize: 16 },
  inputGroup: { marginTop: 25 },
  label: { color: '#7C7C7C', fontSize: 16, fontWeight: '600' },
  input: { 
    borderBottomWidth: 1, 
    borderBottomColor: '#E2E2E2', 
    paddingVertical: 10, 
    fontSize: 18, 
    color: '#181725' 
  },
  passwordContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E2E2E2' 
  },
  terms: { 
    color: '#7C7C7C', 
    marginTop: 20, 
    lineHeight: 22, 
    fontSize: 14 
  },
  linkText: { color: '#53B175', fontWeight: '600' },
  mainBtn: { 
    backgroundColor: '#53B175', 
    padding: 20, 
    borderRadius: 19, 
    marginTop: 30, 
    alignItems: 'center' 
  },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  footer: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    marginTop: 25 
  }
});