import React, { useContext } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, Image, 
  FlatList, TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';
import { PRODUCTS } from '../data/data';
import Toast from '../components/Toast';

const ProductCard = ({ item, onAdd, isFav, onFav, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
    <TouchableOpacity style={styles.favIcon} onPress={() => onFav(item)}>
      <Ionicons name={isFav ? "heart" : "heart-outline"} size={22} color={isFav ? "#53B175" : "#7C7C7C"} />
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

export default function HomeScreen({ navigation }) {
  const { addToCart, favorites, toggleFavorite , toastConfig , hideToast} = useContext(AppContext);

  const exclusiveOffers = PRODUCTS.filter(item => item.category === 'exclusive');
  const bestSelling = PRODUCTS.filter(item => item.category === 'bestselling');

  return (
    <SafeAreaView style={styles.container}>

      <Toast 
        message={toastConfig.message}
        visible={toastConfig.visible}
        bgColor={toastConfig.bgColor}
        onHide={hideToast}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 110 }}>
        <View style={styles.header}>
          <Image source={require('../assets/orange_carrot.png')} style={styles.carrotLogo} />
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={20} color="#4C4B4B" />
            <Text style={styles.locationText}>Hanoi, Vietnam</Text>
          </View>
        </View>

        {/* Search Bar giả - Chuyển sang màn Explore */}
        <TouchableOpacity 
          style={styles.searchContainer} 
          onPress={() => navigation.navigate('Explore')}
        >
          <Ionicons name="search" size={22} color="#181725" />
          <Text style={styles.searchPlaceholder}>Search Store</Text>
        </TouchableOpacity>

        <View style={styles.bannerContainer}>
          <Image source={require('../assets/banner.png')} style={styles.bannerImage} resizeMode="cover" />
        </View>

        <Section title="Exclusive Offer" data={exclusiveOffers} navigation={navigation} addToCart={addToCart} favorites={favorites} toggleFavorite={toggleFavorite} />
        <Section title="Best Selling" data={bestSelling} navigation={navigation} addToCart={addToCart} favorites={favorites} toggleFavorite={toggleFavorite} />
      </ScrollView>
    </SafeAreaView>
  );
}

const Section = ({ title, data, navigation, addToCart, favorites, toggleFavorite }) => (
  <View>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity><Text style={styles.seeAllText}>See all</Text></TouchableOpacity>
    </View>
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductCard 
          item={item} onAdd={addToCart}
          isFav={favorites?.some(f => f.id === item.id)}
          onFav={toggleFavorite}
          onPress={() => navigation.navigate('ProductDetail', { item })}
        />
      )}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalList}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { alignItems: 'center', marginTop: 10 },
  carrotLogo: { width: 26, height: 31 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  locationText: { fontSize: 18, fontWeight: '600', color: '#4C4B4B', marginLeft: 5 },
  searchContainer: { flexDirection: 'row', backgroundColor: '#F2F3F2', marginHorizontal: 20, borderRadius: 15, padding: 15, marginTop: 20, alignItems: 'center' },
  searchPlaceholder: { marginLeft: 10, fontSize: 16, color: '#7C7C7C' },
  bannerContainer: { marginHorizontal: 20, marginTop: 20, borderRadius: 15, overflow: 'hidden' },
  bannerImage: { width: '100%', height: 115 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginTop: 25 },
  sectionTitle: { fontSize: 24, fontWeight: '600', color: '#181725' },
  seeAllText: { color: '#53B175', fontSize: 16, fontWeight: '600' },
  horizontalList: { paddingLeft: 20, marginTop: 15 },
  card: { width: 173, height: 248, borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 18, padding: 15, marginRight: 15, backgroundColor: 'white' },
  favIcon: { position: 'absolute', top: 15, right: 15, zIndex: 1 },
  productImg: { width: 100, height: 80, alignSelf: 'center', marginBottom: 20 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  productUnit: { color: '#7C7C7C', fontSize: 14, marginTop: 5 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  price: { fontSize: 18, fontWeight: '600' },
  addBtn: { backgroundColor: '#53B175', borderRadius: 17, width: 45, height: 45, justifyContent: 'center', alignItems: 'center' },
});