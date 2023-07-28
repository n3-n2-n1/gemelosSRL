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
    const snapshot = await database.ref('/productList').once('value');
    const productsData = snapshot.val();

    if (productsData) {
      // Convierte el objeto en un array de productos
      const productList = Object.keys(productsData).map((key) => ({
        id: productsData[key]['CODIGO DE FABRICA'],
        name: productsData[key]['DESCRIPCION OPTIMA'],
        price: parseFloat(productsData[key]['LISTA 1']), // Utiliza el valor numérico directamente
        quantity: productsData[key]['STOCK'].toString(),
        category: productsData[key]['RUBRO'], // Agregar la categoría
        subcategory: productsData[key]['SUBRRUBRO'], // Agregar la subcategoría
        codgecom: productsData[key]['COD GECOM'],
        // Agrega más propiedades según sea necesario para el componente ProductList
      }));

      return productList;
    }

    return []; // Si no hay productos, devuelve un array vacío
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const snapshot = await firebase.database().ref('/productList').once('value');
    const productsData = snapshot.val();

    // Extract unique category names from products' RUBRO and SUBRRUBRO properties
    const categories = productsData
      ? [...new Set(productsData.map((product) => product.RUBRO))]
      : [];

    const subcategories = productsData
      ? [...new Set(productsData.map((product) => product.SUBRRUBRO))]
      : [];

    return { categories, subcategories };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { categories: [], subcategories: [] };
  }
};

export const fetchSubcategories = async () => {
  try {
    const snapshot = await firebase.database().ref('/productList').once('value');
    const productsData = snapshot.val();
    const subcategories = productsData ? [...new Set(productsData.map((product) => product.SUBRRUBRO))] : [];
    return subcategories;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
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
