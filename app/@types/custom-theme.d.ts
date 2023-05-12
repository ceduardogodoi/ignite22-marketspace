import { Theme } from '../config/theme';

declare module 'native-base' {
  interface ICustomTheme extends Theme {}
}
