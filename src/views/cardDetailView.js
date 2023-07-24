// src/screens/CartDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { saveCartProducts, saveTotalBudget } from '../data/firebaseC';
import useCartState from '../data/useCartState';

const CartDetailScreen = ({ route, navigation }) => {


  const { cartItems } = route.params;
  const { clearCart } = useCartState(); // Use the clearCart function from the useCartState hook


  const saveCartToDatabase = () => {
    saveCartProducts(cartItems); // Guardar los productos del carrito en la base de datos
    console.log('Productos del carrito guardados en la base de datos.');
  };

  const getTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return totalPrice.toFixed(2);
  };

  const getTotalBudget = () => {
    const totalBudget = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return totalBudget.toFixed(2);
  };

  const handleSaveBudget = () => {
    const totalBudget = getTotalBudget();
    // Assuming you have a function to get the current user's ID or other identifying information
    const userId = cartItems.reduce((total, item) => item.name); // Replace this with your function to get the user ID
    const cartData = {
      userId: userId,
      cartItems: cartItems,
      totalBudget: totalBudget,
    };
    saveCartProducts(cartData); // Save the cart data (cartItems and totalBudget) to the database
    console.log('Cart data saved to the database:', cartData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Carrito</Text>
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
        <Text style={styles.saveButtonText}>Guardar carrito</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={() => clearCart}>
        <Text style={styles.clearButtonText}>Limpiar Carrito</Text>
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
    backgroundColor: 'blue',
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
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default CartDetailScreen;
