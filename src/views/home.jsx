import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import CategoryList from '../components/categoryLists';
import ProductList from '../components/productList';
import { fetchProducts } from '../data/firebaseC';
import useCartState from '../data/useCartState';
import useCategoryState from '../data/useCategoryState';

const Home = ({ navigation }) => {


  const { cart, handleAddToCart, handleRemoveFromCart } = useCartState();
  const { selectedCategory, setSelectedCategory } = useCategoryState();
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    // Fetch products from the database when the component mounts
    const getProducts = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData);
    };
    getProducts();
  }, []);

  const allProducts = products.filter(
    (product) => !selectedCategory || selectedCategory === 'Todas' || product.category === selectedCategory
  );

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setCategoryModalVisible(true)}>
          <Text style={styles.navbarText}>Categorías</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('CartDetailScreen', { cartItems: cart })}
          style={styles.cartButton}
        >
          <Text style={styles.cartButtonText}>Carrito ({cart.length})</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isCategoryModalVisible} animationType="slide" transparent>
        <TouchableWithoutFeedback onPress={() => setCategoryModalVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Categorías</Text>
              <CategoryList
                categories={['Todas', 'CABLES', 'MODULOS', 'CAJAS', "ILUMINACIÓN"]}
                onSelectCategory={(category) => setSelectedCategory(category)} // Corregir aquí
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <ProductList products={allProducts} cart={cart} onPressAddToCart={handleAddToCart} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Alineamos el contenido al inicio (izquierda)
    alignItems: 'center', // Alineamos verticalmente el contenido al centro
    marginBottom: 10,
    marginTop: 20
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
    padding: 60,
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



export default Home;