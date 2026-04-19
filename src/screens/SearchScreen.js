import React, { useState, useEffect , useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PRODUCTS } from '../data/data';
import { AppContext } from '../context/AppContext';



export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [showFilter, setShowFilter] = useState(false);

  const { addToCart } = useContext(AppContext);

  // Logic tìm kiếm bằng Javascript
  useEffect(() => {
    const result = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(result);
  }, [searchText]);

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ProductDetail', { item })}>
      <Image source={item.image} style={styles.img} resizeMode="contain" />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.unit}>{item.unit}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(item)}><Ionicons name="add" size={20} color="white" /></TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} />
          <TextInput 
            placeholder="Search Store" 
            value={searchText}
            onChangeText={setSearchText}
            style={styles.input}
          />
          {searchText !== '' && <Ionicons name="close-circle" size={18} onPress={() => setSearchText('')} />}
        </View>
        <TouchableOpacity onPress={() => setShowFilter(true)}>
          <Ionicons name="options-outline" size={25} style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      </View>

      <FlatList 
        data={filteredProducts}
        numColumns={2}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      {/* Modal Filter (Cực kỳ giống ảnh của bạn) */}
      <Modal visible={showFilter} animationType="slide">
        <View style={styles.filterModal}>
          <View style={styles.modalHeader}>
            <Ionicons name="close" size={30} onPress={() => setShowFilter(false)} />
            <Text style={styles.modalTitle}>Filters</Text>
            <View style={{ width: 30 }} />
          </View>
          
          <Text style={styles.filterLabel}>Categories</Text>
          {['Eggs', 'Noodles & Pasta', 'Chips'].map(cat => (
            <TouchableOpacity key={cat} style={styles.checkRow}>
              <Ionicons name="checkbox" size={24} color="#53B175" />
              <Text style={styles.checkText}>{cat}</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.applyBtn} onPress={() => setShowFilter(false)}>
            <Text style={styles.applyText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white', paddingTop: 50 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 20 },
  searchBar: { flex: 1, flexDirection: 'row', backgroundColor: '#F2F3F2', borderRadius: 15, padding: 12, alignItems: 'center' },
  input: { flex: 1, marginLeft: 10 },
  card: { flex: 1, margin: 10, borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 18, padding: 15 },
  img: { width: '100%', height: 80, marginBottom: 15 },
  name: { fontWeight: 'bold', fontSize: 16 },
  unit: { color: 'gray' },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  price: { fontSize: 18, fontWeight: 'bold' },
  addBtn: { backgroundColor: '#53B175', borderRadius: 10, padding: 5 },
  filterModal: { flex: 1, backgroundColor: '#F2F3F2', padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  filterLabel: { fontSize: 24, fontWeight: '600', marginBottom: 20 },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  checkText: { marginLeft: 10, fontSize: 16 },
  applyBtn: { backgroundColor: '#53B175', padding: 20, borderRadius: 19, marginTop: 'auto', alignItems: 'center' },
  applyText: { color: 'white', fontWeight: 'bold', fontSize: 18 }
});