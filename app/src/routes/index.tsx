import { NavigationContainer } from '@react-navigation/native';

import { useStore } from '../store';

import { AuthRoutes } from './auth.routes';
import { TabRoutes } from './tab.routes';

export function Routes() {
  const { session } = useStore();

  return (
    <NavigationContainer>
      {!session?.user.id ? (
        <AuthRoutes />
      ) : (
        <TabRoutes />
      )}
    </NavigationContainer>
  );
}
