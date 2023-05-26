import { StyleSheet } from 'react-native';
import { Avatar, Box, Button, IBoxProps } from 'native-base';
import { PencilSimpleLine, User } from 'phosphor-react-native';

import { theme } from '../../../config/theme';

type Props = {
  editable?: boolean;
  imageUrl?: string;
  size: IBoxProps['w'] & IBoxProps['h'];
}

export function MSAvatar({ editable = false, imageUrl, size }: Props) {
  return (
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
        <Avatar w="full" h="full" source={{ uri: "https://github.com/ceduardogodoi.png" }} />
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
        >
          <PencilSimpleLine size={16} color={theme.colors.custom['gray-6']} />
        </Button>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
  },
});
