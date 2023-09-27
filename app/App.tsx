import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Karla_400Regular, Karla_700Bold, useFonts } from '@expo-google-fonts/karla';

import { Routes } from './src/routes';

import { theme } from './config/theme';
import { AuthenticationContextProvider } from './src/contexts/Authentication';

export default function App() {
  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar style="auto" />

          <AuthenticationContextProvider>
            <Routes />
          </AuthenticationContextProvider>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}

