import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Página não encontrada' }} />
      <Text>Esta tela não existe.</Text>
      <Link href="/" style={styles.link}>
        Voltar para o início
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  link: {
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
