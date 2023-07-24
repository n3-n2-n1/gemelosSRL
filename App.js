import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartDetailScreen from '../customGemelos/src/views/cardDetailView';
import Home from '../customGemelos/src/views/home'


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="CartDetailScreen" component={CartDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Alineamos el contenido al inicio (izquierda)
    alignItems: 'center', // Alineamos verticalmente el contenido al centro
    marginBottom: 10,
    paddingTop: 40,
  },
  navbarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  cartButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 8,
  },
  cartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productListContainer: {
    flex: 1,
  },
  cartContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    width: '100%',
    maxHeight: 150,
    overflow: 'scroll',
  },
  cartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
