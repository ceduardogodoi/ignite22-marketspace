import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { Karla_400Regular, Karla_700Bold, useFonts } from '@expo-google-fonts/karla';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Home } from './src/screens/Home';

import { theme } from './config/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar style="auto" />

        <Home />
      </SafeAreaProvider>
    </NativeBaseProvider>
  );
}

