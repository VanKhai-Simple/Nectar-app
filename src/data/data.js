export const PRODUCTS = [
  // Exclusive Offers
  { 
    id: '1', 
    category: 'exclusive', 
    name: 'Organic Bananas', 
    unit: '7pcs, Price', 
    price: 4.99, 
    image: require('../assets/banana.png'),
    description: 'Organic bananas are grown without synthetic pesticides or fertilizers.' 
  },
  { 
    id: '2', 
    category: 'exclusive', 
    name: 'Red Apple', 
    unit: '1kg, Price', 
    price: 4.99, 
    image: require('../assets/apple.png'),
    description: 'Fresh and crunchy red apples, perfect for a healthy snack.' 
  },
  { 
    id: '3', 
    category: 'exclusive', 
    name: 'Bell Pepper Red', 
    unit: '1kg, Price', 
    price: 4.99, 
    image: require('../assets/pepper.png'),
    description: 'Vibrant red bell peppers, rich in vitamin C.' 
  },

  // Best Selling
  { 
    id: '4', 
    category: 'bestselling', 
    name: 'Ginger', 
    unit: '250g, Price', 
    price: 2.99, 
    image: require('../assets/ginger.png'),
    description: 'Fresh ginger root for cooking and medicinal teas.' 
  },
  { 
    id: '5', 
    category: 'bestselling', 
    name: 'Beef Bone', 
    unit: '1kg, Price', 
    price: 12.99, 
    image: require('../assets/beef.png'),
    description: 'High-quality beef bones for nutritious soups.' 
  },

  // Beverages
  { id: 'b1', category: 'beverages', name: 'Diet Coke', unit: '355ml, Price', price: 1.99, image: require('../assets/coke.png') },
  { id: 'b2', category: 'beverages', name: 'Sprite Can', unit: '325ml, Price', price: 1.50, image: require('../assets/sprite.png') },
  { id: 'b3', category: 'beverages', name: 'Apple & Grape Juice', unit: '2L, Price', price: 15.99, image: require('../assets/juice_mix.png') },
  { id: 'b4', category: 'beverages', name: 'Orange Juice', unit: '2L, Price', price: 15.99, image: require('../assets/orange_juice.png') },

  // Groceries (Bổ sung để mục Groceries ở Home có dữ liệu)
  { id: 'g1', category: 'groceries', name: 'Pulses', unit: '1kg, Price', price: 3.50, image: require('../assets/pulses.png') },
  { id: 'g2', category: 'groceries', name: 'Rice', unit: '5kg, Price', price: 10.00, image: require('../assets/rice.png') },
];

export const CATEGORIES = [
  // Thêm trường 'value' để khớp với 'category' trong PRODUCTS
  { id: '1', name: 'Exclusive Offer', value: 'exclusive', bgColor: '#EEF8F2', borderColor: '#53B175' },
  { id: '2', name: 'Best Selling', value: 'bestselling', bgColor: '#FFF9E5', borderColor: '#FDE598' },
  { id: '3', name: 'Beverages', value: 'beverages', bgColor: '#EDF7FC', borderColor: '#B7DFF5' },
  { id: '4', name: 'Groceries', value: 'groceries', bgColor: '#FEF1E4', borderColor: '#F8A44C' },
];