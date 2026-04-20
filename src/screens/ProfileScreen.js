import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

export default function ProfileScreen({ navigation }) {
  const { logout } = useContext(AppContext);

  const menuItems = [
    { id: 1, title: 'Orders', icon: 'cart-outline', screen: 'Order' },
    { id: 2, title: 'My Details', icon: 'card-outline' },
    { id: 3, title: 'Delivery Address', icon: 'location-outline' },
    { id: 4, title: 'Payment Methods', icon: 'wallet-outline' },
    { id: 5, title: 'Promo Cord', icon: 'pricetag-outline' },
    { id: 6, title: 'Notifications', icon: 'notifications-outline' },
    { id: 7, title: 'Help', icon: 'help-circle-outline' },
    { id: 8, title: 'About', icon: 'information-circle-outline' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/300' }} 
            style={styles.avatar} 
          />
          <View style={styles.userInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.userName}>Afsar Hossen</Text>
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name="pencil" size={18} color="#53B175" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userEmail}>imshuvo97@gmail.com</Text>
          </View>
        </View>

        <View style={styles.menuList}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => item.screen && navigation.navigate(item.screen)}
            >
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon} size={24} color="#181725" />
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#181725" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <View style={styles.logoutIcon}>
            <Ionicons name="log-out-outline" size={24} color="#53B175" />
          </View>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  scrollContent: { paddingBottom: 30 },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  avatar: { width: 64, height: 64, borderRadius: 27, marginRight: 20 },
  userInfo: { flex: 1 },
  nameContainer: { flexDirection: 'row', alignItems: 'center' },
  userName: { fontSize: 20, fontWeight: 'bold', color: '#181725', marginRight: 10 },
  userEmail: { fontSize: 16, color: '#7C7C7C', marginTop: 5 },
  menuList: { marginTop: 10 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
  },
  menuLeft: { flexDirection: 'row', alignItems: 'center' },
  menuTitle: { fontSize: 18, fontWeight: '600', color: '#181725', marginLeft: 20 },
  logoutBtn: {
    backgroundColor: '#F2F3F2',
    marginHorizontal: 25,
    marginTop: 40,
    padding: 20,
    borderRadius: 19,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  logoutText: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '600', color: '#53B175' },
  logoutIcon: { position: 'absolute', left: 20 },
});