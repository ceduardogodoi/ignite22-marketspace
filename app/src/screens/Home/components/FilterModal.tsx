import { Platform } from 'react-native';
import { Modal, IModalProps, Text, VStack, HStack, Checkbox, Button } from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X } from 'phosphor-react-native';

import { MSTag } from '../../../components/MSTag';
import { MSSwitch } from '../../../components/MSSwitch';

import { theme } from '../../../../config/theme';

import { paymentMethods } from '../../../types/PaymentMethod';

export function FilterModal({
  onClose: handleCloseModal,
  ...rest
}: IModalProps) {
  const insets = useSafeAreaInsets();

  const paddingTop = insets.top + 32;
  const paddingBottom = insets.bottom + 4;

  return (
    <Modal
      justifyContent="flex-start"
      alignItems="flex-start"
      bgColor="custom.gray-6"
      px="6"
      pt={paddingTop}
      pb="8"
      {...rest}
    >
      <VStack>
        <HStack mb="6" w="full" alignItems="center" justifyContent="space-between">
          <Text
            fontWeight="bold"
            fontSize="xl"
            lineHeight="lg"
            color="custom.gray-1"
          >
            Filtrar anúncios
          </Text>

          <Button variant="ghost" _pressed={{ bgColor: 'custom.gray-5' }} onPress={handleCloseModal}>
            <X size={24} color={theme.colors.custom['gray-4']} />
          </Button>
        </HStack>

        <Text
          mb="6"
          fontWeight="bold"
          fontSize="sm"
          lineHeight="xs"
          color="custom.gray-2"
        >
          Condição
        </Text>
        <HStack mb="6">
          <MSTag mr="2" h="7" title="Novo" isSelected />
          <MSTag h="7" title="Usado" />
        </HStack>

        <Text
          mb={Platform.OS === 'android' ? '0' : '6'}
          fontWeight="bold"
          fontSize="sm"
          lineHeight="xs"
          color="custom.gray-2"
        >
          Aceita troca?
        </Text>
        <HStack mb={Platform.OS === 'android' ? '3' : '6'}>
          <MSSwitch size="lg" />
        </HStack>

        <Text
          mb="4"
          fontWeight="bold"
          fontSize="sm"
          lineHeight="xs"
          color="custom.gray-2"
        >
          Meios de pagamento aceitos
        </Text>

        <Checkbox.Group>
          <VStack space="2">
            {paymentMethods
              .map(({ name, key }) => (
                <Checkbox
                  key={key}
                  value={key}
                  borderWidth={1}
                  borderColor="custom.gray-4"
                  borderStyle="solid"
                  _checked={{
                    borderColor: 'custom.blue-light',
                    bgColor: 'custom.blue-light',
                  }}
                >
                  <Text
                    fontSize="md"
                    color="custom.gray-2"
                  >
                    {name}
                  </Text>
                </Checkbox>
              ))
            }
          </VStack>
        </Checkbox.Group>
      </VStack>

      <HStack
        px="6"
        pb={paddingBottom}
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        justifyContent="space-between">
        <Button p="3" w="40" h="12" bgColor="custom.gray-5" borderRadius={6}>
          <Text fontWeight="bold" fontSize="sm" lineHeight="xs" color="custom.gray-2">Resetar filtros</Text>
        </Button>

        <Button p="3" w="40" h="12" bgColor="custom.gray-1" borderRadius={6}>
          <Text fontWeight="bold" fontSize="sm" lineHeight="xs" color="custom.gray-7">Aplicar filtros</Text>
        </Button>
      </HStack>
    </Modal>
  );
}
