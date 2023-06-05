import { StyleSheet } from 'react-native';
import { Box, Text } from 'native-base';
import { Image } from 'expo-image';

type Props = {
  item: string;
  active?: boolean;
};

export function CarouselItem({ item, active = true }: Props) {
  return (
    <Box
      flex={1}
      justifyContent="center"
      bgColor="red.500"
    >
      <Image
        style={styles.image}
        source={{ uri: item }}
      />

      {!active && (
        <>
          <Box
            position="absolute"
            top="0"
            right="0"
            bottom="0"
            left="0"
            bgColor="custom.gray-1"
            opacity={0.6}
            justifyContent="center"
            alignItems="center"
          />

          <Box
            position="absolute"
            top="0"
            right="0"
            bottom="0"
            left="0"
            bgColor="transparent"
            justifyContent="center"
            alignItems="center"
          >
            <Text
              fontWeight="bold"
              fontSize="sm"
              lineHeight="xs"
              textTransform="uppercase"
              color="custom.gray-7"
              opacity={1}
            >
              Anúncio desativado
            </Text>
          </Box>
        </>
      )}
    </Box>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
