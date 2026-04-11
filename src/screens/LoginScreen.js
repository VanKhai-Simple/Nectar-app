import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={require('../assets/orange_carrot.png')} style={styles.logo} />
        
        <View style={styles.header}>
          <Text style={styles.title}>Loging</Text>
          <Text style={styles.subtitle}>Enter your emails and password</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="imshuvo97@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput 
              style={[styles.input, { flex: 1 }]} 
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#7C7C7C" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPass}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainBtn} onPress={() => login()}>
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.linkText}>Singup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
  logo: { alignSelf: 'center', marginTop: 50, marginBottom: 60, width: 30, height: 35 },
  header: { marginBottom: 30 },
  title: { fontSize: 26, fontWeight: '600' },
  subtitle: { color: '#7C7C7C', marginTop: 10 },
  inputGroup: { marginTop: 25 },
  label: { color: '#7C7C7C', fontSize: 16, fontWeight: '500' },
  input: { borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingVertical: 10, fontSize: 18 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  forgotPass: { alignSelf: 'flex-end', marginTop: 15, color: '#181725' },
  mainBtn: { backgroundColor: '#53B175', padding: 20, borderRadius: 19, marginTop: 30, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  linkText: { color: '#53B175', fontWeight: '600' }
});