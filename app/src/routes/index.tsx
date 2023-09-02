import { NavigationContainer } from '@react-navigation/native';

import { useStore } from '../store';

import { AuthRoutes } from './auth.routes';

import { MSLoadingModal } from '../components/MSLoadingModal';
import { AppRoutes } from './app.routes';

export function Routes() {
  const { session, isSessionLoading = false } = useStore();
  console.log('session:', JSON.stringify(session, null, 2));

  if (isSessionLoading) {
    return <MSLoadingModal description="Carregando informações..." />
  }

  return (
    <NavigationContainer>
      {/* <AuthRoutes /> */}

      {!session?.user.id ? (
        <AuthRoutes />
      ) : (
        <AppRoutes />
      )}
    </NavigationContainer>
  );
}
