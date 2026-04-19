import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../data/data'; // Hãy đảm bảo file data có CATEGORIES

export default function FilterScreen({ navigation, route }) {
  const { currentFilters, onApply } = route.params;

  // Khởi tạo state từ dữ liệu cũ đã chọn
  const [selectedCat, setSelectedCat] = useState(currentFilters?.category || '');
  const [selectedPrice, setSelectedPrice] = useState(currentFilters?.maxPrice || 1000);

  const priceRanges = [
    { label: 'Under $10', max: 10 },
    { label: 'Under $20', max: 20 },
    { label: 'Under $50', max: 50 },
    { label: 'All Prices', max: 1000 },
  ];

  const handleApply = () => {
    onApply({
      category: selectedCat,
      maxPrice: selectedPrice
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity onPress={() => { setSelectedCat(''); setSelectedPrice(1000); }}>
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Categories Section */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.list}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat.id} 
              style={styles.row} 
              onPress={() => setSelectedCat(cat.value === selectedCat ? '' : cat.value)}
            >
              <View style={[styles.checkbox, selectedCat === cat.value && styles.checked]}>
                {selectedCat === cat.value && <Ionicons name="checkmark" size={16} color="white" />}
              </View>
              <Text style={[styles.label, selectedCat === cat.value && styles.labelActive]}>{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Price Section */}
        <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Price Range</Text>
        <View style={styles.list}>
          {priceRanges.map((range) => (
            <TouchableOpacity 
              key={range.max} 
              style={styles.row} 
              onPress={() => setSelectedPrice(range.max)}
            >
              <View style={[styles.checkbox, selectedPrice === range.max && styles.checked]}>
                {selectedPrice === range.max && <Ionicons name="checkmark" size={16} color="white" />}
              </View>
              <Text style={[styles.label, selectedPrice === range.max && styles.labelActive]}>{range.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
          <Text style={styles.applyText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  resetText: { color: '#53B175', fontSize: 16, fontWeight: '600' },
  content: { flex: 1, paddingHorizontal: 25 },
  sectionTitle: { fontSize: 24, fontWeight: '600', marginBottom: 20, color: '#181725' },
  list: { gap: 18 },
  row: { flexDirection: 'row', alignItems: 'center' },
  checkbox: { width: 24, height: 24, borderWidth: 1.5, borderColor: '#B1B1B1', borderRadius: 8, marginRight: 15, justifyContent: 'center', alignItems: 'center' },
  checked: { backgroundColor: '#53B175', borderColor: '#53B175' },
  label: { fontSize: 18, color: '#181725' },
  labelActive: { color: '#53B175', fontWeight: '500' },
  footer: { padding: 25 },
  applyBtn: { backgroundColor: '#53B175', padding: 20, borderRadius: 19, alignItems: 'center' },
  applyText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});