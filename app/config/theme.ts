import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    product: {
      blue: '#364D9D',
    },
  }
} as const);

export type Theme = typeof theme
