import { Avatar, Box, Flex, Image, Text } from 'native-base';

import { MSTag } from '../MSTag';

type Props = {
  active?: boolean;
  product: {
    tag: 'Novo' | 'Usado';
  };
};

export function MSProductCard({
  active = true,
  product,
}: Props) {
  return (
    <Box>
      <Box
        minW={153}
        minH={100}
        borderRadius={6}
      >
        {!active && (
          <Box
            bgColor="custom.gray-1"
            opacity={0.4}
            position="absolute"
            top="0"
            right="0"
            bottom="0"
            left="0"
            zIndex={1}
          />
        )}

        <Image
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80"
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
              title={product.tag}
              bgColor={product.tag === 'Novo' ? 'custom.blue' : 'custom.gray-2'}
              color="white"
            />
          </Box>
        </Flex>

        {!active && (
          <Text
            fontSize="sm"
            fontWeight="bold"
            textTransform="uppercase"
            color="custom.gray-7"
            position="absolute"
            right="0"
            bottom="2"
            left="2"
          >
            Anúncio desativado
          </Text>
        )}
      </Box>

      <Box px="0.5">
        <Text
          mt="1"
          fontSize="sm"
          color={active ? 'custom.gray-2' : 'custom.gray-4'}
        >
          Tênis vermelho
        </Text>

        <Text
          mt="1"
          fontSize="md"
          fontWeight={active ? 'bold' : 'normal'}
          color={active ? 'custom.gray-2' : 'custom.gray-4'}
        >
          R$ 59,90
        </Text>
      </Box>
    </Box>
  );
}
