import { setColours } from 'ie-design-system/react';

const darkText = '#4d4d4d';

setColours({
  black: {
    base: '#000'
  },
  white: {
    base: '#fff',
    dark: '#fafafa'
  },
  offWhite: {
    text: darkText,
    base: '#f9f5f1',
    light: '#fefaf6',
    dark: '#bfbfbf'
  }
});

export { colours } from 'ie-design-system/react';
