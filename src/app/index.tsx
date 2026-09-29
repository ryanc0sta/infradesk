import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'InfraDesk' }} />
      <Text style={styles.title}>InfraDesk</Text>
      <Text>Etapa 0 — Fundação com Expo Router</Text>
    </View>
  );
}

// Estilos provisórios: serão substituídos pelo NativeWind na Etapa 1.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
