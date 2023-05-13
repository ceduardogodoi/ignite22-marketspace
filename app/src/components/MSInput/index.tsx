import { IInputProps, Input } from 'native-base';

export function MSInput({ ...rest }: IInputProps) {
  return (
    <Input
      flex={1}
      minH={45}
      maxH={45}
      bgColor="custom.gray-7"
      borderColor="custom.gray-7"
      borderRadius={6}
      color="custom.gray-2"
      _focus={{
        borderWidth: '1',
        borderStyle: 'solid',
        borderColor: 'custom.gray-3',
      }}
      {...rest}
    />
  );
}
