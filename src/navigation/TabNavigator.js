import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import các màn hình chính
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import MyCart from '../screens/MyCart';

// Các màn hình tạm thời (nếu bạn chưa tạo file riêng)
import { View, Text } from 'react-native';
import ProfileScreen from '../screens/ProfileScreen';
const CartPlaceholder = () => <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text>Cart Screen</Text></View>;
const FavouritePlaceholder = () => <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text>Favourite Screen</Text></View>;
const AccountPlaceholder = () => <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text>Account Screen</Text></View>;

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#53B175', // Màu xanh Nectar khi icon được chọn
        tabBarInactiveTintColor: '#181725', // Màu đen khi không chọn
        tabBarStyle: { 
          height: 70, 
          paddingBottom: 10,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          position: 'absolute' // Làm cho thanh tab nổi lên một chút nếu cần
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Shop') {
            iconName = focused ? 'storefront' : 'storefront-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Favourite') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Shop" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Cart" component={MyCart} />
      <Tab.Screen name="Favourite" component={FavoriteScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}