import { Box, Pressable, Text } from 'native-base';
import { XCircle } from 'phosphor-react-native';
import { theme } from '../../../config/theme';

type Props = {
  title: string;
  isSelected?: boolean;
};

export function MSTag({ title, isSelected = false }: Props) {
  return (
    <Pressable
      flexDir="row"
      pl="4"
      pr={isSelected ? '2' : '4'}
      pt="1"
      pb="1"
      bgColor={isSelected ? 'custom.blue-light' : 'custom.gray-5'}
      borderRadius="full"
      alignItems="center"
    >
      <Text
        fontSize="xs"
        fontWeight="bold"
        textTransform="uppercase"
        color={isSelected ? 'white' : 'custom.gray-3'}
      >
        {title}
      </Text>

      {isSelected && (
        <Box ml={2}>
          <XCircle
            color={theme.colors.custom['gray-6']}
            weight="fill"
            size={16}
          />
        </Box>
      )}
    </Pressable>
  );
}
