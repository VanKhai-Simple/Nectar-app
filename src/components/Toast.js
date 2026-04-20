import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function Toast({ message, visible, onHide }) {
  const slideAnim = useRef(new Animated.Value(-100)).current; // Bắt đầu ở ngoài màn hình (trên cùng)

  useEffect(() => {
    if (visible) {
      // Kéo xuống
      Animated.spring(slideAnim, {
        toValue: 50, // Vị trí dừng lại cách mép trên
        useNativeDriver: true,
        tension: 20,
        friction: 7,
      }).start();

      // Sau 2.5 giây thì kéo lên
      const timer = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 500,
          useNativeDriver: true,
        }).start(() => onHide());
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toast, { transform: [{ translateY: slideAnim }] }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    backgroundColor: '#53B175',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  toastText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});