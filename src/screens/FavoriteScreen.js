import React, { useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext'; // Import Context

export default function FavoriteScreen({ navigation }) {
  // 1. Lấy dữ liệu favorites và hàm addToCart từ Context
  const { favorites, addToCart } = useContext(AppContext);

  // 2. Hàm xử lý Add All To Cart
  const handleAddAllToCart = () => {
    if (favorites.length === 0) return;
    
    favorites.forEach(item => {
      addToCart(item);
    });
    alert('Đã thêm tất cả sản phẩm yêu thích vào giỏ hàng!');
  };

  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ProductDetail', { item })}
    >
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.unit}>{item.unit}</Text>
      </View>

      <View style={styles.rightContainer}>
        <Text style={styles.price}>${item.price}</Text>
        <Ionicons name="chevron-forward" size={20} color="#181725" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorite</Text>
      </View>

      <FlatList
        data={favorites} // Dùng dữ liệu thật từ Context
        renderItem={renderFavoriteItem}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        // Hiển thị thông báo nếu danh sách trống
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-dislike-outline" size={80} color="#E2E2E2" />
            <Text style={styles.emptyText}>Chưa có sản phẩm yêu thích nào</Text>
          </View>
        )}
      />

      {/* Chỉ hiện nút Add All nếu có sản phẩm trong danh sách */}
      {favorites.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={handleAddAllToCart}
          >
            <Text style={styles.addButtonText}>Add All To Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  
  listContent: { paddingHorizontal: 20, paddingBottom: 160 },
  
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  image: { width: 60, height: 60 },
  infoContainer: { flex: 1, marginLeft: 20 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  unit: { fontSize: 14, color: '#7C7C7C', marginTop: 3 },
  
  rightContainer: { flexDirection: 'row', alignItems: 'center' },
  price: { fontSize: 16, fontWeight: '600', color: '#181725', marginRight: 10 },
  
  divider: { height: 1, backgroundColor: '#E2E2E2' },
  
  footer: {
    padding: 20,
    position: 'absolute',
    bottom: 90, // Đẩy lên trên thanh Tab tương tự màn MyCart
    left: 0,
    right: 0,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#53B175',
    paddingVertical: 20,
    borderRadius: 19,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addButtonText: { color: 'white', fontSize: 18, fontWeight: '600' },

  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    color: '#7C7C7C',
  }
});