import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const BEVERAGES_DATA = [
  { id: '1', name: 'Diet Coke', unit: '355ml, Price', price: 1.99, image: require('../assets/coke.png') },
  { id: '2', name: 'Sprite Can', unit: '325ml, Price', price: 1.50, image: require('../assets/sprite.png') },
  { id: '3', name: 'Apple & Grape Juice', unit: '2L, Price', price: 15.99, image: require('../assets/juice_mix.png') },
  { id: '4', name: 'Orange Juice', unit: '2L, Price', price: 15.99, image: require('../assets/orange_juice.png') },
  { id: '5', name: 'Coca Cola Can', unit: '325ml, Price', price: 4.99, image: require('../assets/coke_can.png') },
  { id: '6', name: 'Pepsi Can', unit: '330ml, Price', price: 4.99, image: require('../assets/pepsi.png') },
];

export default function BeveragesScreen({ navigation }) {
  
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { item })}
    >
      <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productUnit}>{item.unit}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Beverages</Text>
        <TouchableOpacity style={styles.filterBtn}>
           <Ionicons name="options-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={BEVERAGES_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15,
    paddingVertical: 15 
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  backBtn: { width: 40 },
  filterBtn: { width: 40, alignItems: 'flex-end' },
  
  listContent: { paddingHorizontal: 10, paddingBottom: 50 },
  
  productCard: {
    flex: 1,
    margin: 8,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 15,
    height: 250,
  },
  productImage: { width: '100%', height: 100, marginBottom: 15 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  productUnit: { color: '#7C7C7C', fontSize: 14, marginTop: 5 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  price: { fontSize: 18, fontWeight: '600' },
  addBtn: { backgroundColor: '#53B175', borderRadius: 12, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }
});