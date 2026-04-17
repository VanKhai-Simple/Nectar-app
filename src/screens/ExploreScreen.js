import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TextInput, 
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Dữ liệu danh mục sản phẩm theo ảnh thiết kế
const CATEGORIES = [
  { id: '1', name: 'Fresh Fruits\n& Vegetable', image: require('../assets/fruits.png'), bgColor: '#EEF8F2', borderColor: '#53B175' },
  { id: '2', name: 'Cooking Oil\n& Ghee', image: require('../assets/oil.png'), bgColor: '#FFF6EE', borderColor: '#F8A44C' },
  { id: '3', name: 'Meat & Fish', image: require('../assets/meat.png'), bgColor: '#FDE8E4', borderColor: '#F7A593' },
  { id: '4', name: 'Bakery & Snacks', image: require('../assets/bakery.png'), bgColor: '#F4EBF7', borderColor: '#D3B0E0' },
  { id: '5', name: 'Dairy & Eggs', image: require('../assets/dairy.png'), bgColor: '#FFF9E5', borderColor: '#FDE598' },
  { id: '6', name: 'Beverages', image: require('../assets/beverages.png'), bgColor: '#EDF7FC', borderColor: '#B7DFF5' },
];

export default function ExploreScreen({ navigation }) {
  
  const renderCategory = ({ item }) => (
    <TouchableOpacity 
      style={[styles.catCard, { backgroundColor: item.bgColor, borderColor: item.borderColor }]}
      onPress={() => item.id === '6' ? navigation.navigate('Beverages') : null} // Bấm vào Beverages thì nhảy sang màn Beverages
    >
      <Image source={item.image} style={styles.catImage} resizeMode="contain" />
      <Text style={styles.catName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Products</Text>
      </View>

      {/* Thanh tìm kiếm tương tự HomeScreen */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color="#181725" />
        <TextInput 
          placeholder="Search Store" 
          style={styles.searchInput}
          placeholderTextColor="#7C7C7C"
        />
      </View>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        numColumns={2} // Chia 2 cột
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { marginTop: 20, marginBottom: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#181725' },
  
  searchContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#F2F3F2', 
    marginHorizontal: 20, 
    borderRadius: 15, 
    padding: 15, 
    marginTop: 10, 
    marginBottom: 20,
    alignItems: 'center' 
  },
  searchInput: { marginLeft: 10, fontSize: 16, flex: 1, color: '#181725' },
  
  listContent: { paddingHorizontal: 15, paddingBottom: 100 },
  
  catCard: {
    flex: 1,
    height: 190,
    margin: 8,
    borderRadius: 18,
    borderWidth: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catImage: { width: '80%', height: 90, marginBottom: 15 },
  catName: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#181725',
    lineHeight: 22 
  }
});