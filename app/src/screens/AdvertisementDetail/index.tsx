import { useState } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import {
  Box,
  Button,
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
  useTheme,
} from 'native-base';
import { StatusBar } from 'expo-status-bar';
import {
  ArrowLeft,
  Bank,
  Barcode,
  CreditCard,
  Money,
  QrCode,
  Tag,
  WhatsappLogo,
} from 'phosphor-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';

import { MSAvatar } from '../../components/MSAvatar';
import { MSTag } from '../../components/MSTag';
import { CarouselItem } from './components/CarouselItem';
import { PaginationItem } from './components/PaginationItem';

import { productImages } from '../../utils/data';

export function AdvertisementDetail() {
  const [currentImage, setCurrentImage] = useState(0);
  const isPreviewing = false;

  const { colors } = useTheme();

  const insets = useSafeAreaInsets();

  const { width } = useWindowDimensions();

  const paddingTop = insets.top + 20;
  const paddingBottom = Platform.OS === 'ios' ? insets.bottom : undefined;

  return (
    <ScrollView
      flex={1}
      pt={paddingTop}
      bgColor={isPreviewing ? 'custom.blue-light' : 'custom.gray-7'}
    >
      <VStack
        bgColor="custom.gray-7"
      >
        {isPreviewing ? (
          <VStack
            px="3"
            py="4"
            justifyContent="center"
            alignItems="center"
            bgColor="custom.blue-light"
          >
            <StatusBar
              translucent
              backgroundColor={colors.custom['blue-light']}
              style="light"
            />

            <Heading
              fontWeight="bold"
              fontSize="md"
              lineHeight="md"
              color="custom.gray-7"
            >
              Pré visualização do anúncio
            </Heading>

            <Text
              mt="1"
              fontWeight="normal"
              fontSize="sm"
              lineHeight="xs"
              color="custom.gray-7"
            >
              É assim que seu produto vai aparecer!
            </Text>
          </VStack>
        ) : (
          <HStack px="3">
            <Button variant="ghost" _pressed={{ bgColor: 'custom.gray-5' }}>
              <ArrowLeft size={24} color={colors.custom['gray-1']} />
            </Button>
          </HStack>
        )}

        <Box h="72">
          <Carousel
            loop={false}
            width={width}
            data={productImages}
            renderItem={({ item }) => (
              <CarouselItem item={item} />
            )}
            onProgressChange={(_, absoluteProgress) => {
              setCurrentImage(Math.round(absoluteProgress));
            }}
          />
          <HStack
            p="1"
            position="absolute"
            bottom="0"
            style={{ columnGap: 4 }}
          >
            {productImages.map((image, index) => (
              <PaginationItem
                key={image}
                isActive={index === currentImage}
              />
            ))}
          </HStack>
        </Box>

        <VStack pt="5" pb="7" bgColor="custom.gray-6">
          <VStack px="6">
            <HStack mb="6" alignItems="center">
              <MSAvatar size="6" imageUrl="https://github.com/ceduardogodoi.png" />

              <Text ml="2" fontSize="sm" lineHeight="xs" color="custom.gray-1">Carlos Eduardo</Text>
            </HStack>

            <MSTag title="Novo" w="70px" mb="4" justifyContent="center" alignItems="center" />

            <HStack mb="2" justifyContent="space-between" alignItems="center">
              <Text
                fontWeight="bold"
                fontSize="xl"
                lineHeight="lg"
                color="custom.gray-1"
              >
                Bicicleta
              </Text>

              <HStack alignItems="center">
                <Text
                  fontWeight="bold"
                  fontSize="sm"
                  lineHeight="xs"
                  color="custom.blue-light"
                  alignSelf="flex-end"
                >
                  R${' '}
                </Text>
                <Text
                  fontWeight="bold"
                  fontSize="xl"
                  lineHeight="xs"
                  color="custom.blue-light"
                  style={{
                    transform: [{ translateY: 2 }],
                  }}
                >
                  120,00
                </Text>
              </HStack>
            </HStack>

            <Text mb="6" fontWeight="normal" fontSize="sm" lineHeight="xs" color="custom.gray-2">
              Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
              Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet nibh mauris mauris accumsan, euismod.
              Aenean leo nunc, purus iaculis in aliquam.
            </Text>

            <HStack mb="4">
              <Text mr="2" fontWeight="bold" fontSize="sm" lineHeight="xs" color="custom.gray-2">
                Aceita troca?
              </Text>

              <Text fontWeight="normal" fontSize="sm" lineHeight="xs" color="custom.gray-2">
                Sim
              </Text>
            </HStack>

            <Text mb="2.5" fontWeight="bold" fontSize="sm" lineHeight="xs" color="custom.gray-2">
              Meios de pagamento:
            </Text>

            <HStack mb="1" alignItems="center">
              <Barcode size={18} color={colors.custom['gray-1']} />
              <Text ml="2">Boleto</Text>
            </HStack>
            <HStack mb="1" alignItems="center">
              <QrCode size={18} color={colors.custom['gray-1']} />
              <Text ml="2">Pix</Text>
            </HStack>
            <HStack mb="1" alignItems="center">
              <Money size={18} color={colors.custom['gray-1']} />
              <Text ml="2">Dinheiro</Text>
            </HStack>
            <HStack mb="1" alignItems="center">
              <CreditCard size={18} color={colors.custom['gray-1']} />
              <Text ml="2">Cartão de Crédito</Text>
            </HStack>
            <HStack mb="1" alignItems="center">
              <Bank size={18} color={colors.custom['gray-1']} />
              <Text ml="2">Depósito Bancário</Text>
            </HStack>
          </VStack>
        </VStack>

        {isPreviewing ? (
          <HStack
            px="6"
            py="5"
            pb={paddingBottom}
            bgColor="custom.gray-7"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              minW="40"
              h="10"
              bgColor="custom.gray-5"
              borderRadius={6}
            >
              <HStack space="2">
                <ArrowLeft size={16} color={colors.custom['gray-2']} />

                <Text
                  fontWeight="bold"
                  fontSize="sm"
                  lineHeight="xs"
                  color="custom.gray-2"
                >
                  Voltar e editar
                </Text>
              </HStack>
            </Button>
            <Button
              minW="40"
              h="10"
              bgColor="custom.blue-light"
              borderRadius={6}
            >
              <HStack space="2">
                <Tag size={16} color={colors.custom['gray-6']} />

                <Text
                  fontWeight="bold"
                  fontSize="sm"
                  lineHeight="xs"
                  color="custom.gray-7"
                >
                  Publicar
                </Text>

              </HStack>
            </Button>
          </HStack>
        ) : (
          <HStack
            px="6"
            py="5"
            justifyContent="space-between"
            alignItems="center"
          >
            <HStack>
              <Text
                fontWeight="bold"
                fontSize="sm"
                lineHeight="xs"
                color="custom.blue"
                alignSelf="flex-end"
              >
                R${' '}
              </Text>
              <Text
                fontWeight="bold"
                fontSize="2xl"
                lineHeight="xs"
                color="custom.blue"
                style={{
                  transform: [{ translateY: 3 }],
                }}
              >
                120,00
              </Text>
            </HStack>

            <Button
              p="3"
              h="12"
              bgColor="custom.blue"
              borderRadius={6}
              _pressed={{ bgColor: 'custom.blue-light' }}
            >
              <HStack>
                <WhatsappLogo size={16} weight="fill" color={colors.custom['gray-6']} />

                <Text ml="2" fontWeight="bold" fontSize="sm" lineHeight="xs" color="custom.gray-7">
                  Entrar em contato
                </Text>
              </HStack>
            </Button>
          </HStack>
        )}

        <Box w="full" h={Platform.OS === 'android' ? '12' : '20'} />
      </VStack>
    </ScrollView>
  );
}
