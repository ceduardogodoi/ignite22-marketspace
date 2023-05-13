import { ISwitchProps, Switch } from 'native-base';

type Props = ISwitchProps;

export function MSSwitch({ ...rest }: Props) {
  return (
    <Switch
      offTrackColor="custom.gray-5"
      onTrackColor="custom.blue-light"
      {...rest}
    />
  );
}