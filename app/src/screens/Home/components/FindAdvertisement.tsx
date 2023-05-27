import { Box, Button, Divider, HStack, Text, VStack } from 'native-base';
import { MagnifyingGlass, Sliders } from 'phosphor-react-native';

import { MSInput } from '../../../components/MSInput';

import { theme } from '../../../../config/theme';

type Props = {
  onOpenFilterModal(): void;
};

export function FindAdvertisement({
  onOpenFilterModal: handleOpenFilterModal
}: Props) {
  return (
    <VStack mb="6">
      <Text
        mb="3"
        fontSize="sm"
        lineHeight="xs"
        color="custom.gray-3"
      >
        Compre produtos variados
      </Text>

      <HStack>
        <MSInput placeholder="Buscar anúncio" pr="24" />

        <Box pr="2" position="absolute" top={0} bottom={0} right={0} justifyContent="center">
          <HStack alignItems="center">
            <Button variant="ghost" _pressed={{ bgColor: 'custom.gray-5' }}>
              <MagnifyingGlass size={20} color={theme.colors.custom['gray-2']} />
            </Button>

            <Divider orientation="vertical" h="5" />

            <Button
              variant="ghost"
              _pressed={{ bgColor: 'custom.gray-5' }}
              onPress={handleOpenFilterModal}
            >
              <Sliders size={20} color={theme.colors.custom['gray-2']} />
            </Button>
          </HStack>
        </Box>
      </HStack>
    </VStack>
  )
}
