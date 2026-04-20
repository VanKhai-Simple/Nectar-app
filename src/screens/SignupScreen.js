import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppContext } from '../context/AppContext';

export default function SignupScreen({ navigation }) {
  const { login } = useContext(AppContext);
  
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ các trường thông tin.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Lỗi", "Email không đúng định dạng (ví dụ: abc@gmail.com).");
      return false;
    }

    if (password.length < 6) {
      Alert.alert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự để đảm bảo bảo mật.");
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const newUser = {
        userName: username,
        email: email,
        createdAt: new Date().toISOString()
      };

      // Tự động đăng nhập và lưu session mã hóa vào máy
      await login(newUser); 
      console.log("Đăng ký thành công, dữ liệu đã được mã hóa và lưu trữ.");
      
    } catch (error) {
      console.log("Lỗi hệ thống lưu trữ:", error);
      Alert.alert("Lỗi", "Không thể khởi tạo bộ nhớ ứng dụng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Image source={require('../assets/orange_carrot.png')} style={styles.logo} />
        
        <View style={styles.header}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Enter your credentials to continue</Text>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Username</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Nhập họ tên..." 
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="example@gmail.com" 
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput 
              style={[styles.input, { flex: 1, borderBottomWidth: 0 }]} 
              secureTextEntry={!showPassword} 
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={24} color="#7C7C7C" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.terms}>
            By continuing you agree to our <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy.</Text>
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.mainBtn, loading && { opacity: 0.7 }]} 
          onPress={handleSignup}
          disabled={loading}
        >
          <Text style={styles.btnText}>
            {loading ? "Đang xử lý..." : "Sign Up"}
          </Text>
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
  termsContainer: {
    marginTop: 20,
  },
  terms: { 
    color: '#7C7C7C', 
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