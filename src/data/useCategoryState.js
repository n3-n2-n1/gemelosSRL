import { useState } from 'react';

const useCategoryState = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  return { selectedCategory, setSelectedCategory, selectedSubCategory, setSelectedSubCategory };
};

export default useCategoryState;