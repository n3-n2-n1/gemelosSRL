import { useState } from 'react';

const useCategoryState = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return { selectedCategory, setSelectedCategory };
};

export default useCategoryState;