import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignUp } from '../screens/SignUp';
import { SignIn } from '../screens/SignIn';

export type AuthRootStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<AuthRootStackParamList>();

export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
