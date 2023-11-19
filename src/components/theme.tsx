import { createTheme } from '@mui/material/styles';

export default function theme() {
  return createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            marginLeft:10,
          },
        },
      },
    },
  });
}
