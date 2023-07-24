import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyAe-ugKqOWX5aM8NipTv8hdJgajrrKqI8w",
  authDomain: "gemelossrl-44c8c.firebaseapp.com",
  databaseURL: "https://gemelossrl-44c8c-default-rtdb.firebaseio.com",
  projectId: "gemelossrl-44c8c",
  storageBucket: "gemelossrl-44c8c.appspot.com",
  messagingSenderId: "677069883828",
  appId: "1:677069883828:web:46c4f71535245a9f6c4ae1",
  measurementId: "G-VZYJEL9M0V" 
};

// Inicializar Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();



const fetchProducts = async () => {
  try {
    const snapshot = await database.ref('/products').once('value');
    const products = snapshot.val(); // Obtiene el objeto con los productos
    console.log(products)
    if (products) {
      return Object.values(products); // Convierte el objeto en un array
    }
    return []; // Si no hay productos, devuelve un array vacío
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};



const saveCartProducts = async (cartProducts) => {
  try {
    await database.ref('/cart').set(cartProducts);
    console.log('Productos del carrito guardados en la base de datos.');
  } catch (error) {
    console.error('Error al guardar los productos del carrito:', error);
  }
};

const saveTotalBudget = async (totalBudget) => {
  try {
    // Guardar el presupuesto total en la base de datos en un campo llamado "totalBudget"
    await database.ref('/budget').set({
      totalBudget: parseFloat(totalBudget),
    });
  } catch (error) {
    console.error('Error saving total budget:', error);
  }
};

export {saveCartProducts}
export {saveTotalBudget}
export { fetchProducts };
export default firebase;
