import { NavigationContainer } from '@react-navigation/native';

import { useAppContext } from '../contexts';

import { AuthRoutes } from './auth.routes';
import { TabRoutes } from './tab.routes';

export function Routes() {
  const isAuthenticated = false;
  const { user } = useAppContext();

  return (
    <NavigationContainer>
      {!isAuthenticated ? (
        <AuthRoutes />
      ) : (
        <TabRoutes />
      )}
    </NavigationContainer>
  );
}
