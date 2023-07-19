import { NavigationContainer } from '@react-navigation/native';

import { useStore } from '../store';

import { AuthRoutes } from './auth.routes';
import { TabRoutes } from './tab.routes';

export function Routes() {
  const { session } = useStore();

  console.log('session::', JSON.stringify(session, null, 2));

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
