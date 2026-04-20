import React, { useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

export default function ProductDetailScreen({ route, navigation }) {
  const { item } = route.params;
  const [quantity, setQuantity] = useState(1);

  // 1. Lấy dữ liệu từ Context để đồng bộ Favorite và Cart
  const { addToCart, favorites, toggleFavorite } = useContext(AppContext);

  // Kiểm tra xem món này đã có trong danh sách yêu thích chưa
  const isFav = favorites?.some(f => f.id === item.id);

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  // Hàm xử lý thêm vào giỏ hàng với số lượng đã chọn
  const handleAddToBasket = () => {
    // Nếu trong AppContext hàm addToCart của bạn chỉ nhận item, 
    // bạn có thể cần sửa lại Context hoặc gọi addToCart nhiều lần (vòng lặp).
    // Nhưng cách tốt nhất là truyền thêm tham số quantity:
    for(let i = 0; i < quantity; i++) {
        addToCart(item);
    }
    setToastVisible(true);
    alert(`Đã thêm ${quantity} ${item.name} vào giỏ hàng!`);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>

      <Toast 
        message={toastConfig.message}
        visible={toastConfig.visible}
        bgColor={toastConfig.bgColor}
        onHide={hideToast}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 1. Header Image Section */}
        <View style={styles.imageContainer}>
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconCircle}>
              <Ionicons name="chevron-back" size={28} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle}>
              <Ionicons name="share-outline" size={26} color="black" />
            </TouchableOpacity>
          </View>
          
          <Image 
            source={item.image} 
            style={styles.productImage} 
            resizeMode="contain" 
          />
        </View>

        {/* 2. Content Section */}
        <View style={styles.contentContainer}>
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.unit}>{item.unit}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(item)}>
              <Ionicons 
                name={isFav ? "heart" : "heart-outline"} 
                size={32} 
                color={isFav ? "#53B175" : "#7C7C7C"} 
              />
            </TouchableOpacity>
          </View>

          {/* 3. Quantity & Price Row */}
          <View style={styles.priceRow}>
            <View style={styles.quantitySelector}>
              <TouchableOpacity onPress={decrement} style={styles.qtyBtn}>
                <Ionicons name="remove" size={30} color={quantity > 1 ? "#53B175" : "#7C7C7C"} />
              </TouchableOpacity>
              <View style={styles.qtyDisplay}>
                <Text style={styles.qtyText}>{quantity}</Text>
              </View>
              <TouchableOpacity onPress={increment} style={styles.qtyBtn}>
                <Ionicons name="add" size={30} color="#53B175" />
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>${(item.price * quantity).toFixed(2)}</Text>
          </View>

          <View style={styles.divider} />

          {/* 4. Product Details Accordion */}
          <TouchableOpacity style={styles.infoSection} activeOpacity={0.7}>
            <View style={styles.infoTitleRow}>
              <Text style={styles.infoTitle}>Product Detail</Text>
              <Ionicons name="chevron-down" size={20} color="black" />
            </View>
            <Text style={styles.description}>
              {item.description || "Apples are nutritious. Apples may be good for weight loss. Apples may be good for your heart. As part of a healthy and varied diet."}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoSection} activeOpacity={0.7}>
            <View style={styles.infoTitleRow}>
              <Text style={styles.infoTitle}>Nutritions</Text>
              <View style={styles.infoRight}>
                <View style={styles.tag}><Text style={styles.tagText}>100gr</Text></View>
                <Ionicons name="chevron-forward" size={20} color="black" />
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.infoSection, { marginBottom: 40 }]} activeOpacity={0.7}>
            <View style={styles.infoTitleRow}>
              <Text style={styles.infoTitle}>Review</Text>
              <View style={styles.infoRight}>
                <View style={styles.stars}>
                    {[1,2,3,4,5].map(i => <Ionicons key={i} name="star" size={16} color="#F3603F" />)}
                </View>
                <Ionicons name="chevron-forward" size={20} color="black" />
              </View>
            </View>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* 5. Add to Basket Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.basketBtn} onPress={handleAddToBasket}>
          <Text style={styles.basketBtnText}>Add To Basket</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  imageContainer: {
    height: 300,
    backgroundColor: '#F2F3F2',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  headerButtons: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  iconCircle: {
    padding: 8,
    borderRadius: 20,
  },
  productImage: { width: '80%', height: '70%' },
  contentContainer: { paddingHorizontal: 25, marginTop: 20 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#181725' },
  unit: { color: '#7C7C7C', fontSize: 16, fontWeight: '600', marginTop: 5 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 },
  quantitySelector: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { padding: 5 },
  qtyDisplay: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  qtyText: { fontSize: 18, fontWeight: '600' },
  price: { fontSize: 24, fontWeight: 'bold', color: '#181725' },
  divider: { height: 1, backgroundColor: '#E2E2E2', marginVertical: 25 },
  infoSection: { paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  infoTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  infoTitle: { fontSize: 16, fontWeight: '600', color: '#181725' },
  description: { color: '#7C7C7C', lineHeight: 21, marginTop: 10, fontSize: 13 },
  infoRight: { flexDirection: 'row', alignItems: 'center' },
  tag: { backgroundColor: '#EBEBEB', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5, marginRight: 10 },
  tagText: { fontSize: 12, color: '#7C7C7C' },
  stars: { flexDirection: 'row', marginRight: 10 },
  footer: { 
    padding: 25,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#F2F3F2'
  },
  basketBtn: { 
    backgroundColor: '#53B175', 
    padding: 20, 
    borderRadius: 19, 
    alignItems: 'center' 
  },
  basketBtnText: { color: 'white', fontSize: 18, fontWeight: '600' }
});