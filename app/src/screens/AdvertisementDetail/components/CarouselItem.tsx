import { Box, Text } from 'native-base';

type Props = {
  item: number;
};

export function CarouselItem({ item }: Props) {
  return (
    <Box
      flex={1}
      justifyContent="center"
      bgColor="red.500"
    >
      <Text textAlign="center" fontSize="xl">
        {item}
      </Text>
    </Box>
  );
}
