import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    background: {
      paper: '#fafafa',
    },
    action: {
      focus: 'silver',
      hover: '#dd1a1a',
    },
  },
  spacing: 8,
  components: {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          boxShadow: 'none',
          '&::before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: '0',
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          borderBottom: '1.3px solid rgba(0, 56, 101, 0.1)',
          padding: '0',
          borderRadius: 'none',
          margin: '0',
          fontSize: '20px',
          fontWeight: 'bold',
          '&.Mui-expanded': {
            minHeight: '48px',
            margin: '0',
          },
        },
        content: {
          margin: '0',
          '&.Mui-expanded': {
            margin: '0',
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        body2: {
          fontWeight: 'inherit',
          fontFamily: 'inherit',
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: 'silver',
          '& .MuiSvgIcon-root': {
            fontSize: '24px',
          },
          '&.Mui-checked': {
            color: '#47e7e7',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#47e7e7a6',
          color: 'rgba(255,255,255)',
          textTransform: 'none',
          padding: '4px 12px',
          minWidth: '100px',
          borderRadius:'20px',
          '&.MuiButton-text, &.MuiButton-text:hover':{
            backgroundColor:'transparent',
            textDecoration:'underline',
            color: '#47e7e7',
            marginLeft:'-16px'
          },
          '&:hover': {
            backgroundColor: '#47e7e7a6',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontWeight: 500,
          color: '#70838f',
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          color: '#70838f',
          marginTop: '-4px',
        },
        label: {
          paddingTop: '4px',
          fontSize: '18px',
          color: '#70838f',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'red',
          letterSpacing: '0.16px',
          fontSize: '16px',
          fontWeight: 500,
          fontFamily: 'Roboto',
          '&.Mui-focused': {
            color: '#70838f',
          },
          '&$shrink, &$shrink $asterisk': {
            color: 'red',
            letterSpacing: '0.4px',
            lineHeight: 1.33,
            fontWeight: 500,
            fontFamily: 'Roboto',
          },
          '& $asterisk': {
            color: '#47e7e7',
          },
          '&$error, &$error $asterisk': {
            color: '#b00020',
            fontWeight: 500,
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: '#b00020',
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.3px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#47e7e7',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            outline:'none',
            borderColor: '#47e7e7',
          },
          '& .MuiInputBase-input.Mui-disabled': {
            color: '#70838f',
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            border: 'solid 1px rgba(0, 56, 101, 0.1)',
          },
          '&$error $notchedOutline, &$error:hover $notchedOutline': {
            borderColor: '#e26262',
          },
          fontSize: '16px',
        },
        notchedOutline: {
          border: '2px solid #47e7e7',
          borderRadius:'20px',
        },
        input: {
          background: 'inherit',
          color:'white',
          '&::placeholder':{
            color:'white',
            opacity:'.6'
          }
        },
      },
    },
  },
});

export default theme;
