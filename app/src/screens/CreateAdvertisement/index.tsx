import { Platform, StyleSheet } from 'react-native';
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Heading,
  Pressable,
  Radio,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ArrowLeft, Plus } from 'phosphor-react-native';

import { MSInput } from '../../components/MSInput';
import { MSSwitch } from '../../components/MSSwitch';

import { theme } from '../../../config/theme';

import { paymentMethods } from '../../utils/data';

export function CreateAdvertisement() {
  const insets = useSafeAreaInsets();

  const marginTop = insets.top + 20;
  const paddingBottom = Platform.OS === 'ios' ? insets.bottom : undefined;

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      enableOnAndroid
      extraScrollHeight={Platform.OS === 'android' ? 100 : undefined}
    >
      <VStack mt={marginTop} px="6" pb="6" bgColor="custom.gray-6">
        <HStack mb="6" alignItems="center" justifyContent="center">
          <Heading fontWeight="bold" fontSize="xl" textAlign="center">
            Criar anúncio
          </Heading>

          <Pressable
            position="absolute"
            left="0"
            borderRadius={6}
            _pressed={{
              bgColor: 'custom.gray-5',
            }}
          >
            <ArrowLeft size={24} color={theme.colors.custom['gray-1']} />
          </Pressable>
        </HStack>

        <VStack>
          <Heading
            fontWeight="bold"
            fontSize="md"
            lineHeight="md"
            color="custom.gray-2"
          >
            Imagens
          </Heading>
          <Text
            mt="1"
            fontWeight="normal"
            fontSize="sm"
            lineHeight="xs"
            color="custom.gray-3"
          >
            Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
          </Text>

          <HStack>
            <Box
              mt="4"
              w="24"
              h="24"
              bgColor="custom.gray-5"
              borderRadius={6}
              justifyContent="center"
              alignItems="center"
            >
              <Plus size={24} color={theme.colors.custom['gray-4']} />
            </Box>
          </HStack>
        </VStack>

        <VStack mt="8">
          <Heading
            fontWeight="bold"
            fontSize="md"
            lineHeight="md"
            color="custom.gray-2"
          >
            Sobre o produto
          </Heading>

          <MSInput
            mt="4"
            placeholder="Título do anúncio"
          />

          <TextArea
            mt="8"
            px="4"
            py="3"
            bgColor="custom.gray-7"
            borderRadius={6}
            borderColor="custom.gray-7"
            placeholder="Descrição do produto"
            autoCompleteType
            _focus={{
              borderWidth: '1',
              borderStyle: 'solid',
              borderColor: 'custom.gray-3',
            }}
            _input={{
              selectionColor: theme.colors.custom['gray-4'],
              cursorColor: theme.colors.custom['gray-4'],
            }}
          />

          <Radio.Group name="condition">
            <HStack mt="4" space="4">
              <Radio
                borderWidth={1}
                borderColor="custom.gray-4"
                borderStyle="solid"
                colorScheme="blue"
                _checked={{
                  borderColor: "custom.blue-light",
                  borderStyle: "solid",
                  colorScheme: "custom.blue-light"
                }}
                value="new"
              >
                Produto novo
              </Radio>
              <Radio
                borderWidth={1}
                borderColor="custom.gray-4"
                borderStyle="solid"
                colorScheme="blue"
                _checked={{
                  borderColor: "custom.blue-light",
                  borderStyle: "solid",
                }}
                value="used"
              >
                Produto usado
              </Radio>
            </HStack>
          </Radio.Group>

          <VStack mt="8">
            <Heading
              fontWeight="bold"
              fontSize="md"
              lineHeight="md"
              color="custom.gray-2"
            >
              Venda
            </Heading>

            <MSInput
              mt="4"
              pl="2"
              placeholder="Valor do produto"
              InputLeftElement={<Text ml="4">R$</Text>}
            />

            <Heading
              mt="8"
              mb={Platform.OS === 'android' ? '0' : '4'}
              fontWeight="bold"
              fontSize="md"
              lineHeight="md"
              color="custom.gray-2"
            >
              Aceita troca?
            </Heading>

            <HStack>
              <MSSwitch size="lg" />
            </HStack>
          </VStack>

          <VStack mt="4">
            <Heading
              fontWeight="bold"
              fontSize="md"
              lineHeight="md"
              color="custom.gray-2"
            >
              Meios de pagamento aceitos
            </Heading>

            <Checkbox.Group>
              <VStack mt="3" space="2">
                {paymentMethods
                  .map(paymentType => (
                    <Checkbox
                      key={paymentType}
                      value={paymentType}
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
                        {paymentType}
                      </Text>
                    </Checkbox>
                  ))
                }
              </VStack>
            </Checkbox.Group>
          </VStack>
        </VStack>
      </VStack>

      <HStack
        px="6"
        py="5"
        pb={paddingBottom}
        bgColor="custom.gray-7"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          minW="40"
          h="10"
          bgColor="custom.gray-5"
          borderRadius={6}
        >
          <Text
            fontWeight="bold"
            fontSize="sm"
            lineHeight="xs"
            color="custom.gray-2"
          >
            Cancelar
          </Text>
        </Button>
        <Button
          minW="40"
          h="10"
          bgColor="custom.gray-1"
          borderRadius={6}
        >
          <Text
            fontWeight="bold"
            fontSize="sm"
            lineHeight="xs"
            color="custom.gray-7"
          >
            Avançar
          </Text>
        </Button>
      </HStack>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.custom['gray-6'],
  },
});
