import { GestureResponderEvent, StyleSheet } from 'react-native';
import { Avatar, Box, Button, IBoxProps, Text, VStack } from 'native-base';
import { PencilSimpleLine, User } from 'phosphor-react-native';

import { theme } from '../../../config/theme';

type AvatarProps = {
  size: IBoxProps['w'] & IBoxProps['h'];
}

type Props = AvatarProps & ({
  editable?: false;
  imageUrl: string;
  onPress?(): void;
  errorMessage?: null;
} | {
  editable: true;
  imageUrl?: string;
  onPress(event: GestureResponderEvent): void;
  errorMessage?: string;
})

export function MSAvatar({
  editable = false,
  imageUrl,
  size,
  onPress,
  errorMessage,
}: Props) {
  return (
    <VStack w="full" justifyContent="center" alignItems="center">
      <Box
        w={size}
        h={size}
        bgColor="custom.gray-5"
        borderWidth="2"
        borderStyle="solid"
        borderColor="custom.blue-light"
        rounded="full"
        justifyContent="center"
        alignItems="center"
      >
        {imageUrl ? (
          <Avatar w="full" h="full" source={{ uri: imageUrl }} />
        ) : (
          <User weight="bold" size={45} color={theme.colors.custom['gray-4']} />
        )}

        {editable && (
          <Button
            w="10"
            h="10"
            bgColor="custom.blue-light"
            rounded="full"
            position="absolute"
            right="0"
            bottom="0"
            onPress={onPress}
          >
            <PencilSimpleLine size={16} color={theme.colors.custom['gray-6']} />
          </Button>
        )}
      </Box>

      {errorMessage && (
        <VStack mt="1">
          <Text textAlign="left" color="custom.red-light">{errorMessage}</Text>
        </VStack>
      )}
    </VStack>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
  },
});
