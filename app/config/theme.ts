import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    custom: {
      'blue': '#364D9D',
      'blue-light': '#647AC7',
      'blue-lightest': 'rgba(100, 122, 199, 0.1)',

      'gray-1': '#1A181B',
      'gray-2': '#3E3A40',
      'gray-3': '#5F5B62',
      'gray-4': '#9F9BA1',
      'gray-5': '#D9D8DA',
      'gray-6': '#EDECEE',
      'gray-7': '#F7F7F8',

      'red-light': '#EE7979',
    },
  },

  fontConfig: {
    Karla: {
      700: {
        normal: 'Karla_700Bold',
      },
      400: {
        normal: 'Karla_400Regular',
      },
    },
  },
  fonts: {
    heading: 'Karla',
    body: 'Karla',
  },
} as const);

export type Theme = typeof theme
