import { StatusBar } from 'expo-status-bar';
import { Box, HStack, Heading, NativeBaseProvider, Text } from 'native-base';
import { Karla_400Regular, Karla_700Bold, useFonts } from '@expo-google-fonts/karla';

import { theme } from './config/theme';

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
        <Box flex={1} justifyContent="center" alignItems="center">
          <Heading fontSize="sm" color="custom.blue">Heading</Heading>
          <Text color="custom.red-light">Open up App.tsx to start working on your app!</Text>
        </Box>
      </HStack>
    </NativeBaseProvider>
  );
}

