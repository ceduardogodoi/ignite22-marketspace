import { StatusBar } from 'expo-status-bar';
import { HStack, NativeBaseProvider } from 'native-base';
import { Karla_400Regular, Karla_700Bold, useFonts } from '@expo-google-fonts/karla';

import { theme } from './config/theme';
import { MSProductCard } from './src/components/MSProductCard';

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar style="auto" />

      <HStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        bgColor="black"
      >

        <MSProductCard active={false} product={{ tag: 'Novo' }} />

      </HStack>
    </NativeBaseProvider>
  );
}

