import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

import { useAuthentication } from '../hooks/useAuthentication';
import { MSLoadingModal } from '../components/MSLoadingModal';

export function Routes() {
  const authentication = useAuthentication();
  console.log(JSON.stringify(authentication, null, 2));

  if (authentication.isLoading) {
    return <MSLoadingModal />
  }

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
