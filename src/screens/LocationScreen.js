import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';

export default function LocationScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/location_illustration.png')} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title}>Select Your Location</Text>
        <Text style={styles.subtitle}>Switch on your location to stay in tune with what’s happening in your area</Text>

        <View style={styles.selectBox}>
          <Text style={styles.label}>Your Zone</Text>
          <Text style={styles.value}>Banasree</Text>
        </View>

        <View style={styles.selectBox}>
          <Text style={styles.label}>Your Area</Text>
          <Text style={styles.value}>Types of your area</Text>
        </View>

        <TouchableOpacity 
          style={styles.submitBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  image: { width: 220, height: 170, marginTop: 50 },
  content: { width: '100%', paddingHorizontal: 25, marginTop: 40 },
  title: { fontSize: 24, fontWeight: '600', textAlign: 'center' },
  subtitle: { textAlign: 'center', color: '#7C7C7C', marginVertical: 15 },
  selectBox: { borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingVertical: 15, marginTop: 20 },
  label: { color: '#7C7C7C', fontSize: 16 },
  value: { fontSize: 18, marginTop: 5 },
  submitBtn: { backgroundColor: '#53B175', padding: 20, borderRadius: 19, marginTop: 40, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: '600' }
});