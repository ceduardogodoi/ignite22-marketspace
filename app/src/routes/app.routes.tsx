import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabRoutes } from './tab.routes';

import { CreateAdvertisement } from '../screens/CreateAdvertisement';

export type AppRootStackParamList = {
  TabRoutes: undefined;
  CreateAdvertisement: undefined;
}

const Stack = createNativeStackNavigator<AppRootStackParamList>();

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="TabRoutes" component={TabRoutes} />
      <Stack.Screen name="CreateAdvertisement" component={CreateAdvertisement} />
    </Stack.Navigator>
  );
}
