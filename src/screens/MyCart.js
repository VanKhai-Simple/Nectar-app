import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

export default function MyCart() {
  const { cart, updateQuantity, removeFromCart } = useContext(AppContext);

  // Tính tổng tiền
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartImg} resizeMode="contain" />
      <View style={{ flex: 1, marginLeft: 15 }}>
        <View style={styles.row}>
          <Text style={styles.itemName}>{item.name}</Text>
          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
             <Ionicons name="close" size={22} color="#7C7C7C" />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemUnit}>{item.unit}</Text>
        <View style={[styles.row, { marginTop: 15 }]}>
          <View style={styles.qtyContainer}>
            <TouchableOpacity 
              onPress={() => updateQuantity(item.id, 'dec')} 
              style={styles.qtyBtn}
            >
              <Ionicons name="remove" size={20} color="#B3B3B3" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <TouchableOpacity 
              onPress={() => updateQuantity(item.id, 'inc')} 
              style={styles.qtyBtn}
            >
              <Ionicons name="add" size={20} color="#53B175" />
            </TouchableOpacity>
          </View>
          <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      {/* Dùng FlatList và thêm paddingBottom cho nội dung bên trong */}
      <FlatList 
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        contentContainerStyle={{ paddingBottom: 150 }} // Đệm một khoảng cực lớn để cuộn qua khỏi TabBar
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={{color: 'gray'}}>Giỏ hàng trống</Text>
          </View>
        )}
      />

      {/* Nút Checkout được đặt cố định ở dưới nhưng cách BottomTab một khoảng */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.8}>
          <View style={{ width: 40 }} /> {/* Để giữ text ở giữa */}
          <Text style={styles.checkoutText}>Go to Checkout</Text>
          <View style={styles.priceTag}>
            <Text style={styles.priceTagText}>${totalPrice.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#E2E2E2', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  
  cartItem: { flexDirection: 'row', padding: 20, alignItems: 'center' },
  cartImg: { width: 80, height: 80 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  itemUnit: { color: '#7C7C7C', fontSize: 14 },
  
  qtyContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { 
    borderWidth: 1, 
    borderColor: '#E2E2E2', 
    borderRadius: 12, 
    width: 40, 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  qtyText: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold' },
  itemPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  
  divider: { height: 1, backgroundColor: '#E2E2E2', marginHorizontal: 20 },
  
  footer: { 
    position: 'absolute', 
    bottom: 90, // Đẩy lên trên thanh Tab (Tab cao 70 nên để 90 là đẹp)
    left: 0, 
    right: 0, 
    paddingHorizontal: 20,
    backgroundColor: 'transparent' // Để không che nội dung phía sau khi chưa cuộn tới
  },
  checkoutBtn: { 
    backgroundColor: '#53B175', 
    padding: 20, 
    borderRadius: 19, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    // Thêm shadow cho nút nổi bật
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  checkoutText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  priceTag: { backgroundColor: '#489E67', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 5 },
  priceTagText: { color: 'white', fontSize: 12, fontWeight: 'bold' },
  emptyContainer: { alignItems: 'center', marginTop: 100 }
});