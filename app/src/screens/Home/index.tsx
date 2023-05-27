import { Box, FlatList, VStack } from 'native-base';

import { Header } from './components/Header';
import { AdvertisementsCard } from './components/AdvertisementsCard';
import { FindItems } from './components/FindItems';
import { MSProductCard } from '../../components/MSProductCard';

function HorizontalSeparatorComponent() {
  return <Box h="6" bgColor="transparent" />
}

export function Home() {
  return (
    <VStack flex={1} bgColor="custom.gray-6" px="6" pb="6">
      <Header />

      <AdvertisementsCard />

      <FindItems />

      <FlatList
        data={['1', '2', '3', '4', '5', '6']}
        keyExtractor={item => item}
        numColumns={2}
        ItemSeparatorComponent={HorizontalSeparatorComponent}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        renderItem={() => (
          <MSProductCard
            product={{
              tag:
                Math.round(Math.random() * 10) > 5 ? 'Novo' : 'Usado',
            }}
          />
        )}
      />
    </VStack>
  );
}
