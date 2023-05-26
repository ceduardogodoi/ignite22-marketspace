import { VStack } from 'native-base';

import { Header } from './components/Header';

export function Home() {
  return (
    <VStack flex={1} bgColor="custom.gray-6" px="6">
      <Header />
    </VStack>
  );
}
