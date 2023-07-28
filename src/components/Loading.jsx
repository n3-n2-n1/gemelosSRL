import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';

const LoadingScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showLoadingScreen = async () => {
      // Agrega un await aquí para que la pantalla de carga se muestre durante un tiempo específico
      await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 2 segundos (2000 milisegundos)

      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000, // Duración de la animación de aparecer en milisegundos
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000, // Duración de la animación de desaparecer en milisegundos
            useNativeDriver: true,
          }),
        ]),
        {
          iterations: 2, // Repetir la animación infinitamente
        }
      ).start();
    };

    showLoadingScreen();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../data/loading.png')}
        style={[styles.loadingImage, { opacity: fadeAnim }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingImage: {
    width: 100,
    height: 100,
  },
});

export default LoadingScreen;
