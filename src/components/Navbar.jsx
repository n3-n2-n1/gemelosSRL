import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, TextInput} from 'react-native';

const Navbar = ({ categories, selectedCategory, onPressCategory, searchQuery, setSearchQuery }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);



  

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressCategory(item)}>
      <Text style={[styles.navbarText, item === selectedCategory ? styles.selectedCategory : null]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderDropdownItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressCategory(item)}>
      <Text style={[styles.dropdownText, item === selectedCategory ? styles.selectedCategory : null]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.navbar}>
      {isDropdownOpen ? (
        <ScrollView style={styles.dropdownList}>
          <FlatList
            data={categories}
            renderItem={renderDropdownItem}
            keyExtractor={(item) => item}
          />
        </ScrollView>
      ) : (
        <FlatList
          data={categories.slice(0, 3)} // Show only the first 3 categories in the navbar
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.flat}
        />
      )}
      <TouchableOpacity style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text style={styles.dropdownButtonText}>Categorías</Text>
      </TouchableOpacity>


      
      
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    zIndex: 90,
  },
  navbarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginRight: 10,
  },
  selectedCategory: {
    color: 'blue',
  },
  flat: {
    marginRight: 20,
    marginTop: 20,
  },
  dropdownButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  dropdownButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownList: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
    zIndex: 100,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});


export default Navbar;