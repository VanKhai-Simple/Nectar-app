import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

export default function MyCart({ navigation }) {
  // Lấy thêm hàm placeOrder từ Context
  const { cart, updateQuantity, removeFromCart, placeOrder } = useContext(AppContext);

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Hàm xử lý đặt hàng
  const handleCheckout = async () => {
    if (cart.length === 0) {
      Alert.alert("Thông báo", "Giỏ hàng của bạn đang trống!");
      return;
    }

    Alert.alert(
      "Xác nhận đặt hàng",
      `Tổng thanh toán của bạn là $${totalPrice.toFixed(2)}. Bạn có muốn tiếp tục?`,
      [
        { text: "Hủy", style: "cancel" },
        { 
          text: "Đồng ý", 
          onPress: async () => {
            const success = await placeOrder(cart, totalPrice);
            if (success) {
              // Hiển thị thông báo đặt hàng thành công
              Alert.alert(
                "Thành công!", 
                "Đơn hàng của bạn đã được ghi nhận và lưu trữ an toàn.",
                [{ text: "Xem đơn hàng", onPress: () => navigation.navigate('Order') }]
              );
            } else {
              Alert.alert("Lỗi", "Không thể xử lý đơn hàng lúc này.");
            }
          }
        }
      ]
    );
  };

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

      <FlatList 
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        contentContainerStyle={{ paddingBottom: 150 }}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={80} color="#E2E2E2" />
            <Text style={{color: 'gray', marginTop: 10, fontSize: 16}}>Giỏ hàng đang trống</Text>
          </View>
        )}
      />

      {cart.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.checkoutBtn} 
            activeOpacity={0.8}
            onPress={handleCheckout}
          >
            <View style={{ width: 40 }} /> 
            <Text style={styles.checkoutText}>Go to Checkout</Text>
            <View style={styles.priceTag}>
              <Text style={styles.priceTagText}>${totalPrice.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { 
    height: 60, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderBottomWidth: 1, 
    borderBottomColor: '#E2E2E2' 
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  cartItem: { flexDirection: 'row', padding: 25, alignItems: 'center' },
  cartImg: { width: 70, height: 70 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  itemUnit: { color: '#7C7C7C', fontSize: 14 },
  qtyContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { 
    borderWidth: 1, 
    borderColor: '#E2E2E2', 
    borderRadius: 15, 
    padding: 5 
  },
  qtyText: { marginHorizontal: 15, fontSize: 16, fontWeight: 'bold' },
  itemPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  divider: { height: 1, backgroundColor: '#E2E2E2', marginHorizontal: 25 },
  emptyContainer: { marginTop: 100, alignItems: 'center' },
  footer: { 
    position: 'absolute', 
    bottom: 90, // Cách Bottom Tab
    left: 0, 
    right: 0, 
    paddingHorizontal: 25 
  },
  checkoutBtn: { 
    backgroundColor: '#53B175', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 20, 
    borderRadius: 19 
  },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  priceTag: { backgroundColor: '#489E67', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 5 },
  priceTagText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});