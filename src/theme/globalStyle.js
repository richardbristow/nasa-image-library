import { createGlobalStyle } from 'styled-components/macro';
import styledNormalize from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  body {
    font-family: 'Open Sans', sans-serif, serif;
  }
`;

const globalTheme = {
  grey: '#2c3139',
  ghostWhite: '#F8F8FF',
  lightGrey: '#B2B2B2',
};

export { GlobalStyle, globalTheme };
