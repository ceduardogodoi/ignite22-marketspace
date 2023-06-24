import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Button, Heading, Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import { MSInput } from '../components/MSInput';

import { RootStackParamList } from '../routes/auth.routes'

import logo from '../assets/logo.png';

const TOP_SPACING = 65;

type AuthRoutesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

export function SignIn() {
  const navigation = useNavigation<AuthRoutesNavigationProp>();

  const insets = useSafeAreaInsets();
  const paddingTop = insets.top + TOP_SPACING;

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

          <VStack>
            <Text mt="20" mb="4" fontSize="sm" color="custom.gray-2" textAlign="center">
              Acesse sua conta
            </Text>

            <MSInput
              placeholder="E-mail"
              w="full"
              mb="4"
              fontSize="md"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <MSInput
              placeholder="Senha"
              w="full"
              mb="8"
              fontSize="md"
              autoCapitalize="none"
              secureTextEntry
            />

            <Button mb="16" p="3" bgColor="custom.blue-light">
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
