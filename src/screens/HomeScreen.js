import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TextInput, 
  FlatList, 
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Dữ liệu mẫu cho sản phẩm
const EXCLUSIVE_OFFERS = [
  { id: '1', name: 'Organic Bananas', unit: '7pcs, Price', price: 4.99, image: require('../assets/banana.png') },
  { id: '2', name: 'Red Apple', unit: '1kg, Price', price: 4.99, image: require('../assets/apple.png') },
  { id: '3', name: 'Bell Pepper Red', unit: '1kg, Price', price: 4.99, image: require('../assets/pepper.png') },
];

const BEST_SELLING = [
  { id: '4', name: 'Bell Pepper Red', unit: '1kg, Price', price: 4.99, image: require('../assets/pepper.png') },
  { id: '5', name: 'Ginger', unit: '250g, Price', price: 4.99, image: require('../assets/ginger.png') },
];

// Component con cho từng thẻ sản phẩm
const ProductCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={item.image} style={styles.productImg} resizeMode="contain" />
    <View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.productUnit}>{item.unit}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

// Component Header của từng Section (Exclusive Offer, Best Selling...)
const SectionHeader = ({ title, onSeeAll }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <TouchableOpacity onPress={onSeeAll}>
      <Text style={styles.seeAllText}>See all</Text>
    </TouchableOpacity>
  </View>
);

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* 1. Header: Logo cà rốt & Địa điểm */}
        <View style={styles.header}>
          <Image source={require('../assets/orange_carrot.png')} style={styles.carrotLogo} />
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={20} color="#4C4B4B" />
            <Text style={styles.locationText}>Dhaka, Banasree</Text>
          </View>
        </View>

        {/* 2. Thanh tìm kiếm */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={22} color="#181725" />
          <TextInput 
            placeholder="Search Store" 
            style={styles.searchInput}
            placeholderTextColor="#7C7C7C"
          />
        </View>

        {/* 3. Banner khuyến mãi */}
        <View style={styles.bannerContainer}>
          <Image 
            source={require('../assets/banner.png')} // Bạn thay bằng ảnh Fresh Vegetables của bạn
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </View>

        {/* 4. Exclusive Offer Section */}
        <SectionHeader title="Exclusive Offer" />
        <FlatList
          horizontal
          data={EXCLUSIVE_OFFERS}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard 
              item={item} 
              onPress={() => navigation.navigate('ProductDetail', { item })} 
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* 5. Best Selling Section */}
        <SectionHeader title="Best Selling" />
        <FlatList
          horizontal
          data={BEST_SELLING}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard 
              item={item} 
              onPress={() => navigation.navigate('ProductDetail', { item })} 
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* 6. Groceries Section (Màu nền khác biệt một chút) */}
        <SectionHeader title="Groceries" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
            {/* Các ô nhỏ Pulses và Rice như trong ảnh */}
            <View style={[styles.groceryCategory, { backgroundColor: '#FEF1E4' }]}>
                <Image source={require('../assets/pulses.png')} style={styles.groceryImg} />
                <Text style={styles.groceryText}>Pulses</Text>
            </View>
            <View style={[styles.groceryCategory, { backgroundColor: '#E5F3EA' }]}>
                <Image source={require('../assets/rice.png')} style={styles.groceryImg} />
                <Text style={styles.groceryText}>Rice</Text>
            </View>
        </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
}

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
    marginRight: 15 
  },
  productImg: { width: 100, height: 80, alignSelf: 'center', marginBottom: 20 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  productUnit: { color: '#7C7C7C', fontSize: 14, marginTop: 5 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  price: { fontSize: 18, fontWeight: '600', color: '#181725' },
  addBtn: { backgroundColor: '#53B175', borderRadius: 10, width: 45, height: 45, justifyContent: 'center', alignItems: 'center' },

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