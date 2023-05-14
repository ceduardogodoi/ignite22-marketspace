import { Avatar, Box, Flex, Image, Text } from 'native-base';

import { MSTag } from '../MSTag';

type Props = {
  isPaused?: boolean;
};

export function MSProductCard({ isPaused = false }: Props) {
  console.log(isPaused);

  return (
    <Box
      bgColor="custom.gray-7"
    >
      <Box
        minH="40"
        minW="56"
        bgColor="custom.blue-light"
        borderRadius={6}
      >
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80',
          }}
          alt="Tênis vermelho"
          borderRadius={6}
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
        />

        <Flex
          flexDir="row"
          justifyContent="space-between"
          p="1"
        >
          <Avatar
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"',
            }}
          />

          <Box>
            <MSTag
              title="Novo"
            />
          </Box>
        </Flex>
      </Box>

      <Box px="0.5">
        <Text
          mt="1"
          fontSize="sm"
          color="custom.gray-2"
        >
          Tênis vermelho
        </Text>

        <Text
          mt="1.5"
          fontSize="md"
          fontWeight="bold"
          color="custom.gray-1"
        >
          R$ 59,90
        </Text>
      </Box>
    </Box>
  );
}
