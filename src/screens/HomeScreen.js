import React, { useContext, useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, Image, 
  TextInput, FlatList, TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { PRODUCTS } from '../data/data';

// ==========================================
// 1. CÁC COMPONENT CON (UI REUSABLE)
// ==========================================

// Thẻ sản phẩm
const ProductCard = ({ item, onAdd, isFav, onFav, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
    {/* Nút yêu thích */}
    <TouchableOpacity style={styles.favIcon} onPress={() => onFav(item)}>
      <Ionicons 
        name={isFav ? "heart" : "heart-outline"} 
        size={22} 
        color={isFav ? "#53B175" : "#7C7C7C"} 
      />
    </TouchableOpacity>

    <Image source={item.image} style={styles.productImg} resizeMode="contain" />
    
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.productUnit}>{item.unit}</Text>
      
      <View style={styles.priceRow}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => onAdd(item)}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

// Ô danh mục tạp hóa (Groceries)
const GroceryItem = ({ title, img, color }) => (
  <View style={[styles.groceryCategory, { backgroundColor: color }]}>
    <Image source={img} style={styles.groceryImg} />
    <Text style={styles.groceryText}>{title}</Text>
  </View>
);

// ==========================================
// 2. MAIN COMPONENT (LOGIC & LAYOUT)
// ==========================================

export default function HomeScreen({ navigation }) {
  const { addToCart, favorites, toggleFavorite } = useContext(AppContext);
  const [searchText, setSearchText] = useState('');

  // CHỈ CẦN 2 DÒNG NÀY LÀ ĐỦ: Lọc trực tiếp từ file data.js dùng chung
  const exclusiveOffers = PRODUCTS.filter(item => 
    item.category === 'exclusive' && 
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const bestSelling = PRODUCTS.filter(item => 
    item.category === 'bestselling' && 
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        
        {/* Header: Logo & Location */}
        <View style={styles.header}>
          <Image source={require('../assets/orange_carrot.png')} style={styles.carrotLogo} />
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={20} color="#4C4B4B" />
            <Text style={styles.locationText}>Dhaka, Banasree</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={22} color="#181725" />
          <TextInput 
            placeholder="Search Store" 
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#7C7C7C"
          />
        </View>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={require('../assets/banner.png')} style={styles.bannerImage} resizeMode="cover" />
        </View>

        {/* Exclusive Offer Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Exclusive Offer</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>See all</Text></TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={exclusiveOffers} // Dùng dữ liệu đã lọc ở trên
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard 
              item={item}
              onAdd={addToCart}
              isFav={favorites?.some(f => f.id === item.id)}
              onFav={toggleFavorite}
              onPress={() => navigation.navigate('ProductDetail', { item })}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* Best Selling Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Best Selling</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>See all</Text></TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={bestSelling} // Dùng dữ liệu đã lọc ở trên
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard 
              item={item}
              onAdd={addToCart}
              isFav={favorites?.some(f => f.id === item.id)}
              onFav={toggleFavorite}
              onPress={() => navigation.navigate('ProductDetail', { item })}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* Groceries Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Groceries</Text>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Beverages')} // Ví dụ: Bấm See all vào Beverages
          >
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          <GroceryItem title="Pulses" img={require('../assets/pulses.png')} color="#FEF1E4" />
          <GroceryItem title="Rice" img={require('../assets/rice.png')} color="#E5F3EA" />
        </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
}

// ==========================================
// 3. STYLES (ĐỊNH DẠNG GIAO DIỆN)
// ==========================================

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { alignItems: 'center', marginTop: 10 },
  carrotLogo: { width: 26, height: 31 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  locationText: { fontSize: 18, fontWeight: '600', color: '#4C4B4B', marginLeft: 5 },
  
  searchContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#F2F3F2', 
    marginHorizontal: 20, 
    borderRadius: 15, 
    padding: 15, 
    marginTop: 20, 
    alignItems: 'center' 
  },
  searchInput: { marginLeft: 10, fontSize: 16, flex: 1, color: '#181725' },
  
  bannerContainer: { marginHorizontal: 20, marginTop: 20, borderRadius: 15, overflow: 'hidden' },
  bannerImage: { width: '100%', height: 115 },
  
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginHorizontal: 20, 
    marginTop: 25 
  },
  sectionTitle: { fontSize: 24, fontWeight: '600', color: '#181725' },
  seeAllText: { color: '#53B175', fontSize: 16, fontWeight: '600' },
  
  horizontalList: { paddingLeft: 20, marginTop: 15 },
  
  card: { 
    width: 173, 
    height: 248, 
    borderWidth: 1, 
    borderColor: '#E2E2E2', 
    borderRadius: 18, 
    padding: 15, 
    marginRight: 15,
    backgroundColor: 'white'
  },
  favIcon: { position: 'absolute', top: 15, right: 15, zIndex: 1 },
  productImg: { width: 100, height: 80, alignSelf: 'center', marginBottom: 20 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  productUnit: { color: '#7C7C7C', fontSize: 14, marginTop: 5 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  price: { fontSize: 18, fontWeight: '600', color: '#181725' },
  addBtn: { backgroundColor: '#53B175', borderRadius: 17, width: 45, height: 45, justifyContent: 'center', alignItems: 'center' },

  groceryCategory: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    width: 250, 
    height: 105, 
    borderRadius: 18, 
    padding: 15, 
    marginRight: 15 
  },
  groceryImg: { width: 70, height: 70, resizeMode: 'contain' },
  groceryText: { fontSize: 20, fontWeight: '600', marginLeft: 15, color: '#3E423F' }
});