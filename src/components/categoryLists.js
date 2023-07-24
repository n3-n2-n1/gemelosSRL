// components/CategoryList.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CategoryList = ({ categories, onSelectCategory }) => {
  return (
    <View>
      {categories.map((category) => (
        <TouchableOpacity key={category} onPress={() => onSelectCategory(category)}>
          <Text>{category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryList;
