import { Box } from 'native-base';

type Props = {
  isActive?: boolean
};

export function PaginationItem({ isActive = false }: Props) {
  return (
    <Box
      flex={1}
      h="1"
      bgColor="custom.gray-7"
      opacity={isActive ? 0.75 : 0.5}
      rounded="full"
    />
  );
}
