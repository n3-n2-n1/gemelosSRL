// hooks/useCartState.js
import { useState } from 'react';

const useCartState = () => {

  
    const [cart, setCart] = useState([]);


      // Function to clear the cart
    const clearCart = () => {
      setCart([]); // Set the cart state to an empty array, effectively clearing the cart
    };


    const handleRemoveFromCart = (product) => {
        // Find the index of the product in the cart
        const productIndex = cart.findIndex((item) => item.id === product.id);
    
        if (productIndex !== -1 && cart[productIndex].quantity > 1) {
          // If the product is in the cart and its quantity is greater than 1, decrease its quantity
          setCart((prevCart) =>
            prevCart.map((item, index) =>
              index === productIndex ? { ...item, quantity: item.quantity - 1 } : item
            )
          );
        } else {
          // If the product's quantity is 1 or it's not in the cart, remove it from the cart
          setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
        }
      };
      
      const handleAddToCart = (product, action) => {
        // Find the index of the product in the cart
        const productIndex = cart.findIndex((item) => item.id === product.id);
    
        if (action === 'add') {
          // If the product is already in the cart, increase its quantity
          if (productIndex !== -1) {
            setCart((prevCart) =>
              prevCart.map((item, index) =>
                index === productIndex ? { ...item, quantity: item.quantity + 1 } : item
              )
            );
          } else {
            // If the product is not in the cart, add it with quantity 1
            setCart([...cart, { ...product, quantity: 1 }]);
          }
        } else if (action === 'remove') {
          // If the product is in the cart and its quantity is greater than 1, decrease its quantity
          if (productIndex !== -1 && cart[productIndex].quantity > 1) {
            setCart((prevCart) =>
              prevCart.map((item, index) =>
                index === productIndex ? { ...item, quantity: item.quantity - 1 } : item
              )
            );
          } else {
            // If the product's quantity is 1 or it's not in the cart, remove it from the cart
            setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
          }
        }
      };

      
    
  return { clearCart, cart, handleAddToCart, handleRemoveFromCart };
};

export default useCartState;
