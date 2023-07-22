import { Box, Button, HStack, Heading, Text, VStack } from 'native-base';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus } from 'phosphor-react-native';

import { MSAvatar } from '../../../components/MSAvatar';

import { useStore } from '../../../store';

import { theme } from '../../../../config/theme';
import { http } from '../../../libs/axios';

export function Header() {
  const { session } = useStore();

  const insets = useSafeAreaInsets();

  if (!session) {
    return null;
  }
  const { user } = session;

  const marginTop = insets.top + 36;

  return (
    <HStack mt={marginTop} justifyContent="space-between">
      <HStack>
        <Box mr="2.5">
          <MSAvatar
            size="12"
            imageUrl={`${http.defaults.baseURL}/images/${user.avatar}`}
          />
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
            {user.name}
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
