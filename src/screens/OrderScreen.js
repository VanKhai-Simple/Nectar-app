import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

export default function OrderScreen({ navigation }) {
  const { orders } = useContext(AppContext);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderIdText}>Order #{item.id}</Text>
        <Text style={styles.orderDate}>{new Date(item.date).toLocaleDateString('vi-VN')}</Text>
      </View>
      
      <View style={styles.itemList}>
        {item.items.map((prod, index) => (
          <Text key={index} style={styles.productName}>• {prod.name} (x{prod.quantity})</Text>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.statusText}>{item.status || 'Delivered'}</Text>
        <Text style={styles.totalText}>${item.total.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.title}>My Orders</Text>
        <View style={{ width: 28 }} />
      </View>

      {orders && orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={80} color="#E2E2E2" />
          <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1, 
    borderBottomColor: '#E2E2E2' 
  },
  backBtn: { padding: 5 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    elevation: 2,
  },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  orderIdText: { fontWeight: 'bold', fontSize: 16, color: '#181725' },
  orderDate: { color: '#7C7C7C' },
  itemList: { borderBottomWidth: 1, borderBottomColor: '#F2F3F2', paddingBottom: 10 },
  productName: { color: '#181725', fontSize: 14, marginVertical: 2 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' },
  statusText: { color: '#53B175', fontWeight: 'bold' },
  totalText: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 },
  emptyText: { color: '#7C7C7C', fontSize: 16, marginTop: 15 }
});