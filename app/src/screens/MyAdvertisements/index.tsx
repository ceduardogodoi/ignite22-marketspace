import {
  Box,
  FlatList,
  HStack,
  Heading,
  Pressable,
  Select,
  Text,
  VStack,
} from 'native-base';
import { Plus } from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MSProductCard } from '../../components/MSProductCard';

import { theme } from '../../../config/theme';

function HorizontalSeparatorComponent() {
  return <Box h="6" bgColor="transparent" />
}

export function MyAdvertisements() {
  const insets = useSafeAreaInsets();

  const marginTop = insets.top + 20;

  return (
    <VStack flex={1} bgColor="custom.gray-6">
      <VStack mt={marginTop} px="6">
        <HStack alignItems="center" justifyContent="center">
          <Heading fontWeight="bold" fontSize="xl" textAlign="center">
            Meus anúncios
          </Heading>

          <Pressable
            position="absolute"
            right="0"
            borderRadius={6}
            _pressed={{
              bgColor: 'custom.gray-5',
            }}
          >
            <Plus size={24} color={theme.colors.custom['gray-1']} />
          </Pressable>
        </HStack>

        <HStack mt="8" justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="custom.gray-2">9 anúncios</Text>

          <Select placeholder="Todos" minW="32" fontSize="sm" p="3">
            <Select.Item label="Teste" value="1" />
          </Select>
        </HStack>

        <FlatList
          mt="5"
          mb="40"
          data={['1', '2', '3', '4', '5', '6', '7', '8']}
          keyExtractor={item => item}
          numColumns={2}
          ItemSeparatorComponent={HorizontalSeparatorComponent}
          columnWrapperStyle={{
            justifyContent: 'space-between',
          }}
          ListFooterComponent={HorizontalSeparatorComponent}
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
    </VStack>
  );
}