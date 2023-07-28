  import React, { useEffect, useState } from 'react';
  import { View, ActivityIndicator, Text, TouchableOpacity, StyleSheet } from 'react-native';
  import { useDispatch, useSelector } from 'react-redux';
  import Navbar from '../components/Navbar';
  import ModalCategories from '../components/ModalCategories';
  import ProductList from '../components/productList';
  import { fetchProducts, fetchCategories } from '../data/firebaseC';
  import { addToCart, removeFromCart } from '../redux/cartActions'; // Import the removeFromCart action
  import useCategoryState from '../data/useCategoryState'
import LoadingScreen from '../components/Loading';

  const Home = ({ navigation }) => {
    const { selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory } = useCategoryState();
    const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Use the useDispatch hook to dispatch actions
    const dispatch = useDispatch();

    // Use useSelector to access the cart state from Redux store
    const cartItems = useSelector((state) => state.cart.cartItems);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { categories, subcategories } = await fetchCategories();
          setCategories(categories);
          setSubcategories(subcategories);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching categories and subcategories:', error);
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    useEffect(() => {
      const getProducts = async () => {
        const productsData = await fetchProducts();
        setProducts(productsData);
      };

      getProducts();
    }, []);

    const handleSelectCategory = (category) => {
      setSelectedCategory(category);
      setSelectedSubCategory(null);
    };

    const handleSelectSubcategory = (subcategory) => {
      setSelectedSubCategory(subcategory);
    };

    const handleAddToCart = (product, action) => {
      if (action === 'add') {
        // Dispatch the addToCart action with the selected product
        dispatch({ type: 'ADD_TO_CART', payload: product });
      } else if (action === 'remove') {
        // Dispatch the removeFromCart action with the product ID
        dispatch({ type: 'REMOVE_FROM_CART', payload: product.id });
      }
    };

    if (loading) {
      return (
        <LoadingScreen />
      );
    }
    
    const filteredProducts = products?.filter((product) => {
      // Check if the product belongs to the selected category (if any category is selected)
      const isMatchingCategory = !selectedCategory || product.category === selectedCategory;

      // Check if the product name or brand matches the search query (if any search query is entered)
      const isMatchingSearchQuery =
        !searchQuery ||
        product.name.includes(searchQuery) ||
        product.brand.includes(searchQuery);

      return isMatchingCategory && isMatchingSearchQuery;
    }) ?? [];

    return (
      <View style={styles.container}>
        <Navbar
          categories={categories}
          selectedCategory={selectedCategory}
          onPressCategory={handleSelectCategory}
          searchQuery={searchQuery} // Pass the searchQuery state as prop
          setSearchQuery={setSearchQuery} // Pass the setSearchQuery function as prop
        />
        <ProductList products={filteredProducts} cart={cartItems} onPressAddToCart={handleAddToCart} />
        <ModalCategories
          categories={categories}
          subcategories={subcategories}
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory}
          onSelectCategory={handleSelectCategory}
          onSelectSubcategory={handleSelectSubcategory}
          isModalVisible={isCategoryModalVisible}
          onCloseModal={() => setCategoryModalVisible(false)}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('CartDetailScreen', { cartItems: cartItems })}
          style={styles.cartButton}
        >
          <Text style={styles.cartButtonText}>Carrito ({cartItems.length})</Text>
        </TouchableOpacity>
        <View>

        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cartButton: {
      backgroundColor: 'green',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 100,
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
    cartButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default Home;
