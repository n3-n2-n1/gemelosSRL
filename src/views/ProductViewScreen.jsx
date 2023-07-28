import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux'; // Import the useDispatch hook
import { addToCart } from '../redux/cartActions'; // Import the addToCart action

const ProductDetailScreen = ({ route, navigation }) => {
  // Obtener el producto pasado como parámetro desde la lista de productos
  const { product } = route.params;

  const dispatch = useDispatch();

  // Función para agregar el producto al carrito (usando la addToCart action)
  const handleAddToCart = () => {
    // Dispatch the addToCart action with the selected product
    dispatch(addToCart(product));
    console.log('Producto agregado al carrito:', product);
    Alert.alert('Agregado al carrito', `El producto "${product.name}" se ha agregado al carrito.`);
  
  };
  

  

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>Precio: ${parseFloat(product.price).toFixed(2)}</Text>
      <Text style={styles.quantity}>Cantidad: {product.quantity}</Text>
      <TouchableOpacity onPress={handleAddToCart} style={styles.addToCartButton}>
        <Text style={styles.addToCartButtonText}>Agregar al carrito</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 5,
  },
  quantity: {
    fontSize: 18,
    marginBottom: 15,
  },
  addToCartButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 8,
  },
  addToCartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProductDetailScreen;
