import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Box, Button, Heading, Text, VStack } from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { MSInput } from '../components/MSInput';
import { MSAvatar } from '../components/MSAvatar';

import { theme } from '../../config/theme';

import logo from '../assets/logo.png';

const TOP_SPACING = 36;

const signUpSchema = z.object({
  avatarUri: z.string({ required_error: 'Imagem de perfil é obrigatória' }),
  name: z.string({ required_error: 'Informe seu nome' })
    .nonempty({ message: 'Informe seu nome' }),
  email: z.string({ required_error: 'Informe seu e-mail' })
    .email({ message: 'E-mail inválido' })
    .nonempty({ message: 'Informe seu e-mail' }),
  tel: z.string({ required_error: 'Informe seu telefone' })
    .nonempty({ message: 'Informe seu telefone' }),
  password: z.string({ required_error: 'Informe uma senha' })
    .nonempty({ message: 'Informe uma senha' }),
  confirm_password: z.string({ required_error: 'Informe a confirmação de senha' })
    .nonempty({ message: 'Informe a confirmação de senha' }),
});

type SignUpFormData = z.infer<typeof signUpSchema>

export function SignUp() {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + TOP_SPACING;

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: {
      errors,
      isSubmitted,
      isValid,
    }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const avatarUri = watch('avatarUri');

  async function handlePickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setValue('avatarUri', result.assets[0].uri);
    }
  }

  function handleCreate(data: SignUpFormData) {
    console.log(JSON.stringify(data, null, 2));
  }

  return (
    <KeyboardAwareScrollView
      style={[styles.container, { paddingTop }]}
      enableOnAndroid
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <VStack
          px="12"
          alignItems="center"
        >
          <Image source={logo} style={styles.logo} />

          <Heading mt="3" fontSize="xl" color="custom.gray-1">
            Boas vindas!
          </Heading>

          <Text mt="2" fontSize="sm" textAlign="center" color="custom.gray-2">
            Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
          </Text>

          <VStack mt="8" w="full" alignItems="center" space="4">
            <MSAvatar
              size="20"
              editable
              onPress={handlePickImage}
              errorMessage={errors.avatarUri?.message}
              imageUrl={avatarUri}
            />

            <Controller
              name="name"
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <MSInput
                  placeholder="Nome"
                  fontSize="md"
                  autoCapitalize="words"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <MSInput
                  placeholder="E-mail"
                  fontSize="md"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              name="tel"
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <MSInput
                  placeholder="Telefone"
                  fontSize="md"
                  keyboardType="phone-pad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.tel?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <MSInput
                  placeholder="Senha"
                  secureTextEntry
                  // workaround for "Strong Password yellow highlight on iOS"
                  textContentType="oneTimeCode"
                  autoComplete="off"
                  autoCapitalize="none"
                  fontSize="md"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.password?.message}
                />
              )}
            />
            <Controller
              name="confirm_password"
              control={control}
              render={({ field: { onBlur, onChange, value } }) => (
                <MSInput
                  placeholder="Confirmar senha"
                  secureTextEntry
                  // workaround for "Strong Password yellow highlight on iOS"
                  textContentType="oneTimeCode"
                  autoComplete="off"
                  autoCapitalize="none"
                  fontSize="md"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.confirm_password?.message}
                />
              )}
            />
          </VStack>

          <Button
            mt="6"
            w="full"
            p="3"
            bgColor="custom.gray-1"
            borderRadius={6}
            isDisabled={isSubmitted && !isValid}
            _disabled={{
              bgColor: 'custom.gray-4',
            }}
            _pressed={{
              bgColor: 'custom.gray-2',
            }}
            onPress={handleSubmit(handleCreate)}
          >
            <Text fontWeight="bold" fontSize="sm" color="custom.gray-7">Criar</Text>
          </Button>

          <Text mt="12" fontSize="sm" color="custom.gray-2">
            Já tem uma conta?
          </Text>
          <Button
            mt="4"
            w="full"
            p="3"
            bgColor="custom.gray-5"
            borderRadius={6}
            _pressed={{
              bgColor: 'custom.gray-4',
            }}
          >
            <Text fontWeight="bold" fontSize="sm" color="custom.gray-2">Ir para o login</Text>
          </Button>

          <Box w="full" h="32" />
        </VStack>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 40,
  },
  container: {
    backgroundColor: theme.colors.custom['gray-6'],
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
  },
});
