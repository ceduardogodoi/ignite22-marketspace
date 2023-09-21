import { Box, Button, HStack, Heading, Text, VStack } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus } from 'phosphor-react-native';
import { AppRootStackParamList } from '../../../routes/app.routes';
import { MSAvatar } from '../../../components/MSAvatar';
import { http } from '../../../libs/axios';
import { theme } from '../../../../config/theme';

type HomeRoutesNavigationProp = NativeStackNavigationProp<AppRootStackParamList, 'TabRoutes'>;

export function Header() {
  const navigation = useNavigation<HomeRoutesNavigationProp>();

  const insets = useSafeAreaInsets();

  const marginTop = insets.top + 36;

  function handleGoToCreateAdvertisement() {
    navigation.navigate('CreateAdvertisement');
  }

  return (
    <HStack mt={marginTop} justifyContent="space-between">
      <HStack>
        <Box mr="2.5">
          {/* <MSAvatar
            size="12"
            imageUrl={`${http.defaults.baseURL}/images/${user.avatar}`}
          /> */}
        </Box>

        <VStack>
          <Text
            fontSize="md"
            lineHeight="md"
            color="custom.gray-1"
          >
            Boas vindas,
          </Text>
          <Heading
            fontSize="md"
            lineHeight="md"
            color="custom.gray-1"
          >
            {/* {user.name} */}
            Username
          </Heading>
        </VStack>
      </HStack>

      <Button
        bgColor="custom.gray-1"
        borderRadius={6}
        p="3"
        alignItems="center"
        _pressed={{
          bgColor: 'custom.gray-2',
        }}
        onPress={handleGoToCreateAdvertisement}
      >
        <HStack>
          <Box mr="2">
            <Plus size={16} color={theme.colors.custom['gray-6']} />
          </Box>

          <Text
            fontSize="sm"
            lineHeight="xs"
            fontWeight="bold"
            color="custom.gray-7"
          >
            Criar anúncio
          </Text>
        </HStack>
      </Button>
    </HStack>
  );
}
