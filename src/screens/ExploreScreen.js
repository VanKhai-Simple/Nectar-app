import React, { useState, useContext } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TextInput, 
  TouchableOpacity, Image, Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { PRODUCTS } from '../data/data';

const { width } = Dimensions.get('window');

export default function ExploreScreen({ navigation }) {
  const { addToCart, favorites, toggleFavorite } = useContext(AppContext);
  const [searchText, setSearchText] = useState('');
  
  // State quản lý bộ lọc
  const [filters, setFilters] = useState({
    category: '',
    maxPrice: 1000,
  });

  // LOGIC LỌC TỔNG HỢP
  const filteredProducts = PRODUCTS.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory = filters.category ? item.category === filters.category : true;
    const matchPrice = item.price <= filters.maxPrice;
    return matchSearch && matchCategory && matchPrice;
  });

  const renderItem = ({ item }) => {
    const isFav = favorites?.some(f => f.id === item.id);
    return (
      <TouchableOpacity 
        style={styles.productCard}
        onPress={() => navigation.navigate('ProductDetail', { item })}
      >
        <TouchableOpacity style={styles.favIcon} onPress={() => toggleFavorite(item)}>
          <Ionicons name={isFav ? "heart" : "heart-outline"} size={20} color={isFav ? "#53B175" : "#7C7C7C"} />
        </TouchableOpacity>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.unit}>{item.unit}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>${item.price}</Text>
              <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}>
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Find Products</Text>
      
      <View style={styles.searchRow}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={22} color="#181725" />
          <TextInput 
            placeholder="Search Store" 
            style={styles.input}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity 
          style={styles.filterBtn}
          onPress={() => navigation.navigate('Filter', { 
            currentFilters: filters,
            onApply: (newFilters) => setFilters(newFilters) 
          })}
        >
          <Ionicons name="options-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={80} color="#E2E2E2" />
            <Text style={styles.emptyText}>No products found.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 10 },
  searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 20 },
  searchBar: { flex: 1, flexDirection: 'row', backgroundColor: '#F2F3F2', borderRadius: 15, padding: 12, alignItems: 'center' },
  input: { marginLeft: 10, flex: 1, fontSize: 16 },
  filterBtn: { marginLeft: 15 },
  listContent: { paddingHorizontal: 10, paddingBottom: 100, marginTop: 15 },
  productCard: { 
    width: (width - 60) / 2, 
    margin: 10, 
    borderWidth: 1, 
    borderColor: '#E2E2E2', 
    borderRadius: 18, 
    padding: 15, 
    height: 250,
    backgroundColor: 'white' 
  },
  favIcon: { position: 'absolute', top: 12, right: 12, zIndex: 1 },
  image: { width: '100%', height: 90, marginBottom: 15 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  unit: { fontSize: 14, color: '#7C7C7C', marginTop: 3 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  price: { fontSize: 18, fontWeight: '600', color: '#181725' },
  addBtn: { backgroundColor: '#53B175', borderRadius: 12, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { marginTop: 10, color: '#7C7C7C', fontSize: 16 }
});