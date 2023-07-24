import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';


const ProductList = ({ products, cart, onPressAddToCart }) => {


  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(product) => product.id}
      renderItem={({ item: product }) => (
        <View key={product.id} style={styles.card}>
          <Text>{product.name}</Text>
          <Text>Precio: ${parseFloat(product.price).toFixed(2)}</Text>
          <Text>Cantidad: {product.quantity}</Text>
          <TouchableOpacity onPress={() => onPressAddToCart(product, 'add')}>
            <Text style={styles.addToCartButton}>Agregar al carrito</Text>
          </TouchableOpacity>
          {isInCart(product.id) && (
            <TouchableOpacity onPress={() => onPressAddToCart(product, 'remove')}>
              <Text>Quitar del carrito</Text>
            </TouchableOpacity>
          )}


        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
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
  },
  addToCartButton: {
    color: 'blue',
    marginTop: 5,
  },
  cartQuantity: {
    marginLeft: 10,
  },
});

export default ProductList;
