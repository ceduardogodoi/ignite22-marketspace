import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Box, NativeBaseProvider } from 'native-base';

import { theme } from './config/theme';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style="auto" />

      <View style={styles.container}>
        <Box backgroundColor="product.blue">Open up App.tsx to start working on your app!</Box>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
