// CategoryList.js
import React from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryItem = React.memo(({ item, selectedCategory, selectedSubcategory, onSelectCategory, onSelectSubcategory }) => {
  const isSelected = selectedCategory === item || selectedSubcategory === item;
  const onPress = () => {
    if (isSelected) {
      // If already selected, reset the category or subcategory
      if (selectedCategory === item) {
        onSelectCategory(null);
      } else {
        onSelectSubcategory(null);
      }
    } else {
      // Otherwise, select the category or subcategory
      if (item.subcategories.length > 0) {
        onSelectCategory(item);
      } else {
        onSelectSubcategory(item);
      }
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.categoryItem, isSelected && styles.selectedItem]}>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );
});

const CategoryList = ({ categories, subcategories, selectedCategory, selectedSubcategory, onSelectCategory, onSelectSubcategory }) => {
  console.log('Categories:', categories);
  console.log('Subcategories:', subcategories);

  const renderItem = ({ item }) => {
    console.log('Rendering item:', item?.name);
    return (
      <CategoryItem
        item={item}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        onSelectCategory={onSelectCategory}
        onSelectSubcategory={onSelectSubcategory}
      />
    );
  };

  return (
    <View style={styles.categoryListContainer}>
      <FlatList
        data={subcategories.length > 0 ? categories : subcategories}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        style={styles.categoryItem}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  categoryListContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  categoryItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  selectedItem: {
    backgroundColor: 'lightgray',
  },
  categoryText: {
    fontSize: 16,
  },
});

export default CategoryList;
