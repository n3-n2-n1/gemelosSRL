import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import productsData from '../data/csvjson.json';

import { useNavigation } from '@react-navigation/native';



const ProductList = ({ products, cart, onPressAddToCart }) => {
  const navigation = useNavigation();

  const handleAddToCart = (product, action) => {
    if (action === 'add') {
      // Dispatch the addToCart action with the selected product
      dispatch(addToCart(product));
    } else if (action === 'remove') {
      // Dispatch the removeFromCart action with the product ID
      dispatch(removeFromCart(product.id)); // Use product.id to remove the product from cart
    }
  };


  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(product) => product['CODIGO DE FABRICA']}
      renderItem={({ item: product }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ProductDetailScreen', { product })}
          style={styles.card}
        >
          <View key={product.id} style={styles.card}>
            <Text>{product.name}</Text>
            <Text>Precio: ${parseFloat(product.price).toFixed(2)}</Text>
            <Text>Cantidad: {product.quantity}</Text>
            <View style={styles.addToCartButtonContainer}>
              <TouchableOpacity onPress={() => onPressAddToCart(product, 'add')}>
                <Text style={styles.addToCartButton}>Agregar al carrito</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPressAddToCart(product, 'remove')}>
                <Text style={styles.removeToCartButton}>Quitar del carrito</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  addToCartButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'red',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 10,
  },
  addToCartButton: {
    color: 'white',
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'blue',
  },
  removeToCartButton: {
    color: 'white',
    margin: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: 'blue',
  },
  cartQuantity: {
    marginLeft: 10,
  },
});

export default ProductList;
