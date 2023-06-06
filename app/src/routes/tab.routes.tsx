import { useTheme } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { House, IconWeight, SignOut, Tag } from 'phosphor-react-native';

import { Home } from '../screens/Home';
import { MyAdvertisements } from '../screens/MyAdvertisements';

type RootStackParamList = {
  Home: undefined;
  MyAdvertisements: undefined;
  SignOut: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

function SignOutRouteComponent() {
  return null;
}

export function TabRoutes() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarIcon({ focused, color }) {
        const weight: IconWeight = focused ? 'bold' : 'regular';

        switch (route.name) {
          case 'Home': {
            return <House size={24} weight={weight} color={color} />;
          };
          case 'MyAdvertisements': {
            return <Tag size={24} weight={weight} color={color} />;
          };
          default: {
            return <SignOut size={24} weight={weight} color="#EE7979" />;
          };
        }
      },
    })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarActiveTintColor: colors.custom['gray-2'],
          tabBarInactiveTintColor: colors.custom['gray-4'],
        }}
      />

      <Tab.Screen
        name="MyAdvertisements"
        component={MyAdvertisements}
        options={{
          tabBarActiveTintColor: colors.custom['gray-2'],
          tabBarInactiveTintColor: colors.custom['gray-4'],
        }}
      />

      <Tab.Screen
        name="SignOut"
        component={SignOutRouteComponent}
        listeners={{
          tabPress() {
            console.log('exit');
          }
        }}
      />
    </Tab.Navigator>
  );
}
