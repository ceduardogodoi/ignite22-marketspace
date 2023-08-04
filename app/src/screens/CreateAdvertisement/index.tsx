import { LogBox, Platform, StyleSheet } from 'react-native';
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
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Plus, X } from 'phosphor-react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MSInput } from '../../components/MSInput';
import { MSSwitch } from '../../components/MSSwitch';
import { theme } from '../../../config/theme';
import { paymentMethods } from '../../utils/data';
import { AppRootStackParamList } from '../../routes/app.routes';

LogBox.ignoreLogs([
  "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
]);

type CreateAdvertisementRoutesNavigationProp = NativeStackNavigationProp<AppRootStackParamList, 'CreateAdvertisement'>;

const createAdvertisementSchema = z.object({
  // images: z.array(
  //   z.string(), { required_error: 'As imagens são obrigatórias' }
  // )
  //   .min(1, 'Mínimo de uma imagem')
  //   .max(3, 'Máximo de três imagens'),
  name: z.string({ required_error: 'Título é obrigatório' }),
  description: z.string({ required_error: 'Descrição é obrigatória' }),
  is_new: z.string({ required_error: 'Informe a condição do produto' }),
  price: z
    .string({ required_error: 'Preço é obrigatório' })
    .transform(Number),
  accept_trade: z.boolean(),
  payment_methods: z.array(
    z.string(), { required_error: 'Método de pagamento é obrigatório' }
  ).min(1, 'Escolha pelo menos uma forma de pagamento'),
})

type FormDataInput = z.input<typeof createAdvertisementSchema>;
type FormDataOutput = z.output<typeof createAdvertisementSchema>;

export function CreateAdvertisement() {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<CreateAdvertisementRoutesNavigationProp>();

  const { control, handleSubmit, formState: { errors } } = useForm<FormDataInput, undefined, FormDataOutput>({
    resolver: zodResolver(createAdvertisementSchema),
  });

  const marginTop = insets.top + 20;
  const paddingBottom = Platform.OS === 'ios' ? insets.bottom : undefined;

  function handleCreateAdvertisement(data: FormDataOutput) {
    console.log(JSON.stringify(data, null, 2));
  }

  function handleGoHome() {
    navigation.navigate('TabRoutes');
  }

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
            onPress={handleGoHome}
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
              <Pressable
                w="5"
                h="5"
                bgColor="custom.gray-2"
                rounded="full"
                justifyContent="center"
                alignItems="center"
                position="absolute"
                top="1"
                right="1"
              >
                <X size={12} color={theme.colors.custom['gray-7']} />
              </Pressable>

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

          <Controller
            name="name"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <MSInput
                mt="4"
                placeholder="Título do anúncio"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field: { onBlur, onChange, value } }) => (
              <>
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
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />

                {errors.description?.message && (
                  <VStack mt="1">
                    <Text color="custom.red-light">{errors.description.message}</Text>
                  </VStack>
                )}
              </>
            )}
          />

          <Controller
            name="is_new"
            control={control}
            render={({ field: { onChange } }) => (
              <Radio.Group name="condition" onChange={val => onChange(val)}>
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

                {errors.is_new?.message && (
                  <VStack mt="1">
                    <Text color="custom.red-light">{errors.is_new.message}</Text>
                  </VStack>
                )}
              </Radio.Group>
            )}
          />

          <VStack mt="8">
            <Heading
              fontWeight="bold"
              fontSize="md"
              lineHeight="md"
              color="custom.gray-2"
            >
              Venda
            </Heading>

            <Controller
              name="price"
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <MSInput
                  mt="4"
                  pl="2"
                  placeholder="Valor do produto"
                  keyboardType="numeric"
                  InputLeftElement={<Text ml="4">R$</Text>}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.price?.message}
                />
              )}
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
              <Controller
                name="accept_trade"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <MSSwitch
                    size="lg"
                    onToggle={(value: boolean) => onChange(value)}
                    value={value}
                  />
                )}
              />
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

            <Controller
              name="payment_methods"
              control={control}
              render={({ field: { onChange } }) => (
                <Checkbox.Group
                  onChange={onChange}
                >
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
                  {errors.payment_methods?.message && (
                    <VStack mt="1">
                      <Text color="custom.red-light">{errors.payment_methods.message}</Text>
                    </VStack>
                  )}
                </Checkbox.Group>
              )}
            />
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
          onPress={handleSubmit(handleCreateAdvertisement)}
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
