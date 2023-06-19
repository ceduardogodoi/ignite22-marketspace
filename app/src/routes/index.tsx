import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { TabRoutes } from './tab.routes';

export function Routes() {
  const isAuthenticated = false;

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
