import React from 'react';
import { Modal, TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import CategoryList from '../components/categoryLists';

const ModalCategories = ({ categories, subcategories, selectedCategory, selectedSubCategory, onSelectCategory, onSelectSubcategory, isModalVisible, onCloseModal }) => {
  return (
    <Modal visible={isModalVisible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={onCloseModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Categorías</Text>
            <CategoryList
              categories={categories}
              subcategories={subcategories}
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubCategory}
              onSelectCategory={onSelectCategory}
              onSelectSubcategory={onSelectSubcategory}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ModalCategories;
