import { HStack, IInputProps, Input, Pressable } from 'native-base';
import { Eye, EyeClosed } from 'phosphor-react-native';

import { theme } from '../../../config/theme';
import { useState } from 'react';

type MSInputProps = IInputProps & {
  errorMessage?: string;
}

export function MSInput({
  mb,
  w,
  errorMessage,
  secureTextEntry = false,
  ...rest
}: MSInputProps) {
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [_secureTextEntry, _setSecureTextEntry] = useState(secureTextEntry);

  console.log(errorMessage);

  function toggleIsShowingPassword() {
    setIsShowingPassword(state => !state);
    _setSecureTextEntry(state => !state);
  }

  return (
    <HStack
      flex={1}
      minH={45}
      maxH={45}
      w={w}
      mb={mb}
    >
      <Input
        placeholderTextColor="custom.gray-4"
        flex={1}
        minH={45}
        maxH={45}
        px="4"
        pr="10"
        bgColor="custom.gray-7"
        borderColor="custom.gray-7"
        borderRadius={6}
        color="custom.gray-2"
        _focus={{
          borderWidth: '1',
          borderStyle: 'solid',
          borderColor: 'custom.gray-3',
        }}
        _input={{
          selectionColor: theme.colors.custom['gray-4'],
          cursorColor: theme.colors.custom['gray-4'],
        }}
        secureTextEntry={_secureTextEntry}
        {...rest}
      />

      {secureTextEntry && (
        <Pressable
          h="full"
          pr="4"
          position="absolute"
          right={0}
          justifyContent="center"
          alignItems="center"
          onPress={toggleIsShowingPassword}
          _pressed={{
            opacity: 0.7,
          }}
        >
          {isShowingPassword ? (
            <Eye
              color={theme.colors.custom['gray-3']}
              size={20}
            />
          ) : (
            <EyeClosed
              color={theme.colors.custom['gray-3']}
              size={20}
            />
          )}
        </Pressable>
      )}
    </HStack>
  );
}
