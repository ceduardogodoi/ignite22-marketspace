import { Box, Button, HStack, Text, VStack } from 'native-base';
import { ArrowRight, Tag } from 'phosphor-react-native';

import { theme } from '../../../../config/theme';

export function AdvertisementsCard() {
  return (
    <VStack mt="8" mb="8">
      <Text
        fontSize="sm"
        lineHeight="xs"
        color="custom.gray-3"
      >
        Seus produtos anunciados para venda
      </Text>

      <HStack w="full" mt="3" py="3" px="4" borderRadius={6} bgColor="custom.blue-lightest" justifyContent="space-between">
        <HStack alignItems="center">
          <Box mr="4">
            <Tag size={22} color={theme.colors.custom.blue} />
          </Box>

          <VStack>
            <Text fontWeight="bold" fontSize="xl" lineHeight="lg" color="custom.gray-2">4</Text>
            <Text fontSize="xs" lineHeight="2xs" color="custom.gray-2">anúncios ativos</Text>
          </VStack>
        </HStack>

        <Button variant="ghost" alignItems="center" _pressed={{ bgColor: 'custom.blue-lightest' }}>
          <HStack alignItems="center">
            <Text mr="2" fontWeight="bold" fontSize="xs" lineHeight="2xs" color="custom.blue">Meus anúncios</Text>

            <ArrowRight size={16} color={theme.colors.custom.blue} />
          </HStack>
        </Button>
      </HStack>
    </VStack>
  );
}
