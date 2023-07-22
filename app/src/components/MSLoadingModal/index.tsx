import { Center, Spinner, Text } from 'native-base';

type MSLoadingModalProps = {
  description?: string
}

export function MSLoadingModal({ description }: MSLoadingModalProps) {
  return (
    <Center flex={1}>
      <Spinner color="custom.blue-light" size="lg" />

      {description && (
        <Text mt="4" color="custom.blue-light">{description}</Text>
      )}
    </Center>
  )
}
