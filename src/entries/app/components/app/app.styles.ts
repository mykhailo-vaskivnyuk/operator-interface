import { createStyles } from '@material-ui/core/styles';

export const styles = createStyles({
  '@global': {
    '#root': {
      // height: '100vh',
      width: `${1366 + 10}px`,
      height: `${768 + 10}px`,
    },
    'html, body': {
      width: '100%',
      fontSize: '18px',
      fontFamily: 'Roboto',
      margin: '0',
    },
    '*': {
      boxSizing: 'border-box',
    },
    '::-webkit-scrollbar': {
      width: '2.2rem',
    },
    '::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 0.3rem #e4e4e4',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#fff',
      borderRadius: '0 1rem 1rem 0',
      border: '1px solid gray',
      borderLeft: 'none',
    },
    '#modal': {
      position: 'absolute',
      zIndex: 1000,
      top: '16%',
      width: '100%',
      height: '84%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  },
});
