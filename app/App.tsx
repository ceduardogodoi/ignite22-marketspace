import { StatusBar } from 'expo-status-bar';
import { HStack, NativeBaseProvider } from 'native-base';
import { Karla_400Regular, Karla_700Bold, useFonts } from '@expo-google-fonts/karla';

import { theme } from './config/theme';
import { MSInput } from './src/components/MSInput';

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style="auto" />

      <HStack flex={1} justifyContent="center" alignItems="center">

        <MSInput placeholder="teste" />

      </HStack>
    </NativeBaseProvider>
  );
}

