import { createGlobalStyle } from 'styled-components/macro';
import styledNormalize from 'styled-normalize';

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css');
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,800');
  @import './variablesMixins.scss';

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
