// src/screens/CartDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { saveCartProducts, saveTotalBudget } from '../data/firebaseC';

import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/cartActions';



const CartDetailScreen = ({ route, navigation }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const saveCartToDatabase = () => {
    saveCartProducts(cartItems);
    console.log('Productos del carrito guardados en la base de datos.');
  };


  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };




  const getTotalBudget = () => {
    const totalBudget = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return totalBudget.toFixed(2);
  };

  const getTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
    return totalPrice.toFixed(2);
  };


  const handleSaveBudget = () => {
    // Obtener la fecha y hora actual en UTC
    const nowUTC = new Date();

  
    // Ajustar el timestamp a GMT-3 (restar 180 minutos)
    const timestampGMT3 = new Date(nowUTC.getTime() - 180 * 60 * 1000);
  
    // Create an array to hold the selected product information
    const selectedProducts = cartItems.map((item) => ({
      name: item.name,
      FabricCode: item.id,
      price: item.price,
      codeGcom: item.codgecom,
      horaPresupuesto: timestampGMT3.toISOString(), // Convertir el timestamp ajustado en formato legible
    }));

    const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  
    // Convert the selectedProducts object to a formatted JSON string
    const selectedProductsString = JSON.stringify(selectedProducts, null, 2);
  
    // Show an alert with the formatted JSON string
    Alert.alert('Selected Products', `${selectedProductsString}\nTotal: $${total.toFixed(2)}`);
  
    console.log(selectedProducts);
  };
  
  
  
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de tu pedido</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name}</Text>
            <Text>Cantidad: {item.quantity}</Text>

            <Text>Precio: ${parseFloat(item.price).toFixed(2)}</Text>
          </View>
        )}
      />
      <Text style={styles.totalPrice}>Total: ${getTotalPrice()}</Text>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveBudget}>
        <Text style={styles.saveButtonText}>Guardar pedido</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
        <Text style={styles.clearButtonText}>Borrar productos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: 'red', // or any other color you like
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 18,

    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButtonText:{
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 5,
    textAlign: 'center',





  }
});


export default CartDetailScreen;
