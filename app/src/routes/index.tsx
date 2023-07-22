import { NavigationContainer } from '@react-navigation/native';

import { useStore } from '../store';

import { AuthRoutes } from './auth.routes';
import { TabRoutes } from './tab.routes';

import { MSLoadingModal } from '../components/MSLoadingModal';

export function Routes() {
  const { session, isSessionLoading = false } = useStore();

  if (isSessionLoading) {
    return <MSLoadingModal description="Carregando informações..." />
  }

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
