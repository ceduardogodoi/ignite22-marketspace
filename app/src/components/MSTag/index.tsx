import { Box, IPressableProps, Pressable, Text } from 'native-base';
import { XCircle } from 'phosphor-react-native';
import { theme } from '../../../config/theme';

type Props = IPressableProps & {
  title: string;
  isSelected?: boolean;
};

export function MSTag({ title, isSelected = false, color, ...rest }: Props) {
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
      {...rest}
    >
      <Text
        fontSize="xs"
        fontWeight="bold"
        textTransform="uppercase"
        color={color}
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
