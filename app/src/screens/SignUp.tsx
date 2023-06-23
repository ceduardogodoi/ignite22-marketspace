import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Box, Button, Heading, Text, VStack } from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Image } from 'expo-image';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { MSInput } from '../components/MSInput';
import { MSAvatar } from '../components/MSAvatar';

import { theme } from '../../config/theme';

import logo from '../assets/logo.png';

const TOP_SPACING = 36;

const SignUpSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  tel: z.string(),
  password: z.string(),
  confirm_password: z.string(),
});

type SignUpData = z.infer<typeof SignUpSchema>;

export function SignUp() {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + TOP_SPACING;

  const { control, handleSubmit } = useForm<SignUpData>({
    resolver: zodResolver(SignUpSchema),
  });

  async function onSubmit(data: SignUpData) {
    console.log(data);
  };

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

          <Box style={styles.form} mt="8" w="full" alignItems="center">
            <MSAvatar size="20" editable />

            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <MSInput
                  placeholder="Nome"
                  fontSize="md"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <MSInput
                  placeholder="E-mail"
                  fontSize="md"
                  keyboardType="email-address"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="tel"
              render={({ field: { onChange, onBlur, value } }) => (
                <MSInput
                  placeholder="Telefone"
                  fontSize="md"
                  keyboardType="phone-pad"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <MSInput
                  placeholder="Senha"
                  secureTextEntry
                  fontSize="md"
                  keyboardType="visible-password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange, onBlur, value } }) => (
                <MSInput
                  placeholder="Confirmar senha"
                  secureTextEntry
                  fontSize="md"
                  keyboardType="visible-password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </Box>

          <Button
            mt="6"
            w="full"
            p="3"
            bgColor="custom.gray-1"
            borderRadius={6}
            _pressed={{
              bgColor: 'custom.gray-2',
            }}
            onPress={handleSubmit(onSubmit)}
          >
            <Text fontWeight="bold" fontSize="sm" color="custom.gray-7">
              Criar
            </Text>
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
            <Text fontWeight="bold" fontSize="sm" color="custom.gray-2">
              Ir para o login
            </Text>
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
  form: {
    rowGap: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
  },
});
