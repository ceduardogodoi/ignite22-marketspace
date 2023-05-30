import { StyleSheet } from 'react-native';
import { Box } from 'native-base';
import { Image } from 'expo-image';

type Props = {
  item: string;
};

export function CarouselItem({ item }: Props) {
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
    </Box>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
