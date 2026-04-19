import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext'; // 1. Import Context
import { PRODUCTS } from '../data/data';

const BEVERAGES_DATA = [
  { id: 'b1', name: 'Diet Coke', unit: '355ml, Price', price: 1.99, image: require('../assets/coke.png') },
  { id: 'b2', name: 'Sprite Can', unit: '325ml, Price', price: 1.50, image: require('../assets/sprite.png') },
  { id: 'b3', name: 'Apple & Grape Juice', unit: '2L, Price', price: 15.99, image: require('../assets/juice_mix.png') },
  { id: 'b4', name: 'Orange Juice', unit: '2L, Price', price: 15.99, image: require('../assets/orange_juice.png') },
  { id: 'b5', name: 'Coca Cola Can', unit: '325ml, Price', price: 4.99, image: require('../assets/coke_can.png') },
  { id: 'b6', name: 'Pepsi Can', unit: '330ml, Price', price: 4.99, image: require('../assets/pepsi.png') },
];

export default function BeveragesScreen({ navigation }) {
  // 2. Lấy các hàm cần thiết từ Context
  const { addToCart, favorites, toggleFavorite } = useContext(AppContext);

  const beveragesData = PRODUCTS.filter(item => item.category === 'beverages');

  const renderItem = ({ item }) => {
    // Kiểm tra xem sản phẩm này có đang được yêu thích không
    const isFav = favorites?.some(f => f.id === item.id);

    return (
      <TouchableOpacity 
        style={styles.productCard}
        onPress={() => navigation.navigate('ProductDetail', { item })}
        activeOpacity={0.8}
      >
        {/* Nút yêu thích ở góc */}
        <TouchableOpacity 
          style={styles.favIcon} 
          onPress={() => toggleFavorite(item)}
        >
          <Ionicons 
            name={isFav ? "heart" : "heart-outline"} 
            size={20} 
            color={isFav ? "#53B175" : "#7C7C7C"} 
          />
        </TouchableOpacity>

        <Image source={item.image} style={styles.productImage} resizeMode="contain" />
        
        <View style={{ flex: 1 }}>
          <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.productUnit}>{item.unit}</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity 
              style={styles.addBtn}
              onPress={() => addToCart(item)} // 3. Gắn hàm thêm vào giỏ hàng
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Beverages</Text>
        <TouchableOpacity style={styles.filterBtn}>
           <Ionicons name="options-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Danh sách lưới 2 cột */}
      <FlatList
        data={beveragesData}
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
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F3F2'
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  backBtn: { width: 40 },
  filterBtn: { width: 40, alignItems: 'flex-end' },
  
  listContent: { paddingHorizontal: 10, paddingBottom: 30 },
  
  productCard: {
    flex: 1,
    margin: 8,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 15,
    height: 250,
    backgroundColor: 'white',
    position: 'relative' // Để icon trái tim định vị tuyệt đối
  },
  favIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1
  },
  productImage: { width: '100%', height: 90, marginBottom: 15 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#181725', minHeight: 40 },
  productUnit: { color: '#7C7C7C', fontSize: 14, marginTop: 2 },
  priceRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 'auto' 
  },
  price: { fontSize: 18, fontWeight: '600', color: '#181725' },
  addBtn: { 
    backgroundColor: '#53B175', 
    borderRadius: 15, 
    width: 45, 
    height: 45, 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
});