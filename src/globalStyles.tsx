import { createGlobalStyle } from 'styled-components';

import { vars } from '@app/styles';

const GlobalStyles = createGlobalStyle`
  html {
    --primaryColor: #007fff;
    --primaryColorDark: #0053b0;
    --btnFontColor: #000000;
    line-height: 1.875;
  }
  
  * {
        box-sizing: border-box;
  }

  @media (prefers-color-scheme: light) {
    html {
      ${vars.card.bg}: white;
      ${vars.card.border}: #f3f3f3;
      ${vars.buttons.primary.text}: var(--btnFontColor);
      ${vars.buttons.primary.border}: none;
      ${vars.buttons.primary.bg}: var(--primaryColor);
      
      ${vars.buttons.secondary.text}: black;
      ${vars.buttons.secondary.border}: #d1d1d6;
      ${vars.buttons.secondary.bg}: white;
          
      ${vars.confirm.title}: #1c1c1e;
    }
  }

  @media (prefers-color-scheme: dark) {
    html {
      ${vars.card.bg}: #2C2C2E;
      ${vars.card.border}: #3A3A3C;
      
      ${vars.buttons.primary.text}: black;
      ${vars.buttons.primary.border}: #d1d1d6;
      ${vars.buttons.primary.bg}: white;
      
      ${vars.buttons.secondary.text}: white;
      ${vars.buttons.secondary.border}: black;
      ${vars.buttons.secondary.bg}: black;
          
      ${vars.confirm.title}: #a1a1a1;;
    }
  }
`;

export default GlobalStyles;
