import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';

import { AppRoutes } from './app.routes';
import { useAuthentication } from '../hooks/useAuthentication';

export function Routes() {
  const authentication = useAuthentication();
  console.log(authentication);

  return (
    <NavigationContainer>
      {authentication.session ? (
        <AppRoutes />
      ) : (
        <AuthRoutes />
      )}
    </NavigationContainer>
  );
}
