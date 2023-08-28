import { LogBox, Platform, StyleSheet } from 'react-native';
import {
  Button,
  Checkbox,
  HStack,
  Heading,
  Image,
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
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MSInput } from '../../components/MSInput';
import { MSSwitch } from '../../components/MSSwitch';
import { theme } from '../../../config/theme';
import { useStore } from '../../store';
import { paymentMethods } from '../../types/PaymentMethod';
import { AppRootStackParamList } from '../../routes/app.routes';

LogBox.ignoreLogs([
  "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
]);

type CreateAdvertisementRoutesNavigationProp = NativeStackNavigationProp<AppRootStackParamList, 'CreateAdvertisement'>;

const createAdvertisementSchema = z.object({
  images: z.array(
    z.object({
      uri: z.string(),
    }),
  )
    .min(2, 'Mínimo de uma imagem')
    .max(3, 'Máximo de três imagens')
    .transform(images => images.filter(image => image.uri)),
  name: z.string({ required_error: 'Título é obrigatório' }),
  description: z.string({ required_error: 'Descrição é obrigatória' }),
  is_new: z.boolean({ required_error: 'Informe a condição do produto' }),
  price: z
    .string({ required_error: 'Preço é obrigatório' })
    .transform(Number),
  accept_trade: z.boolean(),
  payment_methods: z.array(
    z.string(), { required_error: 'Método de pagamento é obrigatório' }
  ).min(1, 'Escolha pelo menos uma forma de pagamento'),
})

type CreateAdvertisementInput = z.input<typeof createAdvertisementSchema>;
type CreateAdvertisementOutput = z.output<typeof createAdvertisementSchema>;

export type CreateAdvertisementFormData = Required<Omit<CreateAdvertisementOutput, 'images'>>;

export function CreateAdvertisement() {
  const insets = useSafeAreaInsets();

  const navigation = useNavigation<CreateAdvertisementRoutesNavigationProp>();

  const context = useStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    setError,
    clearErrors,
  } = useForm<CreateAdvertisementInput, undefined, CreateAdvertisementOutput>({
    resolver: zodResolver(createAdvertisementSchema),
    defaultValues: {
      // images: [
      //   {
      //     uri: '',
      //   },
      // ],
      // accept_trade: false,

      images: [
        {
          uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fapp-aeef5d23-b48f-48fe-b73e-0efee143cae2/ImagePicker/540433b6-377b-4420-b484-8a8ddc2f3d8c.jpeg'
        },
        {
          uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fapp-aeef5d23-b48f-48fe-b73e-0efee143cae2/ImagePicker/30382050-ff6c-4a01-a1c6-9d9e63b0af79.jpeg'
        }
      ],
      name: 'Bike',
      description: 'Bike moderna',
      is_new: true,
      price: '1000',
      accept_trade: false,
      payment_methods: [
        'pix',
        'cash',
      ]
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'images',
    control,
  });

  const marginTop = insets.top + 20;
  const paddingBottom = Platform.OS === 'ios' ? insets.bottom : undefined;

  async function handleCreateAdvertisement(data: CreateAdvertisementOutput) {
    const payload: CreateAdvertisementFormData = {
      name: data.name,
      description: data.description,
      is_new: data.is_new,
      price: data.price,
      accept_trade: data.accept_trade,
      payment_methods: data.payment_methods,
    }

    await context.createAdvertisement(payload);
  }

  function handleGoHome() {
    navigation.navigate('TabRoutes');
  }

  async function handlePickImage(index: number) {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (result.canceled) return;

    const images = [...getValues('images')];
    images[index].uri = result.assets[0].uri;

    setValue('images', images);
    clearErrors('images');

    if (index < 2) {
      append({
        uri: '',
      });
    }
  }

  function handleRemoveImage(index: number) {
    const imagesQuantity = getValues('images').length;
    remove(index);

    if (imagesQuantity === 1) {
      setError('images', {
        type: 'min',
      });

      append({
        uri: '',
      })
    }
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
            {fields.map((field, index) => (
              <Pressable
                key={field.id}
                mt="4"
                mr="2"
                w="24"
                h="24"
                bgColor="custom.gray-5"
                borderRadius={6}
                justifyContent="center"
                alignItems="center"
                onPress={() => handlePickImage(index)}
              >
                {field.uri ? (
                  <>
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
                      onPress={() => handleRemoveImage(index)}
                      zIndex={1}
                    >
                      <X size={12} color={theme.colors.custom['gray-7']} />
                    </Pressable>

                    <Image
                      source={{ uri: field.uri }}
                      alt={`Image ${index + 1}`}
                      w="full"
                      h="full"
                      borderRadius={6}
                    />
                  </>
                ) : (
                  <Plus size={24} color={theme.colors.custom['gray-4']} />
                )}
              </Pressable>
            ))}
          </HStack>

          {errors.images?.message && (
            <VStack mt="1">
              <Text color="custom.red-light">{errors.images.message}</Text>
            </VStack>
          )}
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
            render={({ field: { onChange, value: formValue } }) => {
              let defaultValue: string | undefined = undefined;

              if (typeof formValue === 'boolean') {
                defaultValue = formValue ? 'new' : 'used';
              }

              return (
                <Radio.Group
                  name="condition"
                  onChange={value => onChange(value === 'new')}
                  defaultValue={defaultValue}
                >
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
                      value='new'
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
              )
            }}
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
              render={({ field: { onChange, value: formValue } }) => (
                <Checkbox.Group
                  onChange={onChange}
                  defaultValue={formValue}
                >
                  <VStack mt="3" space="2">
                    {paymentMethods
                      .map(({ name, value }) => {
                        return (
                          <Checkbox
                            key={value}
                            value={value}
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
                        )
                      })
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
          onPress={handleGoHome}
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
