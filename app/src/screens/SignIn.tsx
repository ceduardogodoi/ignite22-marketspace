import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Button, Heading, Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { MSInput } from '../components/MSInput';

import { AuthRootStackParamList } from '../routes/auth.routes'

import logo from '../assets/logo.png';

const TOP_SPACING = 65;

type AuthRoutesNavigationProp = NativeStackNavigationProp<AuthRootStackParamList, 'SignIn'>;

const signInSchema = z.object({
  email: z
    .string({ required_error: 'E-mail é obrigatário' })
    .nonempty({ message: 'E-mail não pode ser vazio' })
    .email({ message: 'Informe um e-mail válido' }),
  password: z
    .string({ required_error: 'Senha é obrigatória' })
    .nonempty({ message: 'Senha não pode ser vazia' })
});

export type SignInFormData = {
  email: string;
  password: string;
}

export function SignIn() {
  const navigation = useNavigation<AuthRoutesNavigationProp>();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: 'a@a.com',
      password: '1',
    },
  });

  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + TOP_SPACING;

  async function handleSignIn(data: SignInFormData) {
  }

  function handleCreateAccount() {
    navigation.navigate('SignUp');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <VStack flex={1} bgColor="white">
        <VStack
          bgColor="custom.gray-6"
          borderBottomRightRadius={24}
          borderBottomLeftRadius={24}
          style={{ paddingTop }}
          px="12"
          justifyContent="center"
          alignItems="center"
        >
          <Image source={logo} style={styles.logo} />

          <Heading mt="5" fontSize="3xl" textAlign="center" color="custom.gray-1">
            marketspace
          </Heading>

          <Text mt="0.5" fontSize="sm" textAlign="center" color="custom.gray-3">
            Seu espaço de compra e venda
          </Text>

          <Text mt="20" fontSize="sm" color="custom.gray-2" textAlign="center">
            Acesse sua conta
          </Text>

          <VStack mt="4" space="4">
            <Controller
              name="email"
              control={control}
              render={({ field: { value, onChange } }) => (
                <MSInput
                  mb="4"
                  placeholder="E-mail"
                  fontSize="md"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { value, onChange } }) => (
                <VStack w="full" mt={errors.email ? '6' : '0'}>
                  <MSInput
                    placeholder="Senha"
                    fontSize="md"
                    autoCapitalize="none"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    errorMessage={errors.password?.message}
                  />
                </VStack>
              )}
            />

            <Button
              mt={errors.password ? '6' : '0'}
              mb="16"
              p="3"
              bg="custom.blue-light"
              onPress={handleSubmit(handleSignIn)}
              isDisabled={!!errors.email || !!errors.password}
              _disabled={{
                opacity: 0.7,
              }}
              _pressed={{
                bg: 'custom.blue',
              }}
            >
              <Text fontWeight="bold" fontSize="sm" color="custom.gray-7">
                Entrar
              </Text>
            </Button>
          </VStack>
        </VStack>

        <VStack px="12">
          <Text mt="12" mb="4" fontSize="sm" color="custom.gray-2" textAlign="center">
            Ainda não tem acesso?
          </Text>

          <Button mb="16" p="3" bgColor="custom.gray-5" onPress={handleCreateAccount}>
            <Text fontWeight="bold" fontSize="sm" color="custom.gray-2">
              Criar uma conta
            </Text>
          </Button>
        </VStack>
      </VStack>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 96,
    height: 64,
  },
});
