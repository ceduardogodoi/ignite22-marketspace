import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignUp } from '../screens/SignUp';
import { SignIn } from '../screens/SignIn';

type RootStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

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
