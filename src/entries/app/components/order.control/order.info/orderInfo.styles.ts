import { createStyles, Theme } from '@material-ui/core/styles';

export const styles = createStyles((theme: Theme) => ({
  wrapper: {
    flex: '1 0 0',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .delete': {
      width: '2rem',
      height: '2rem',
      borderRadius: '100px',
      background: 'white',
      color: theme.palette.error.main,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      outline: 'none',
    },
    '& .total': {
      textAlign: 'center',
      paddingLeft: '20px',
      paddingRight: '20px',
      backgroundColor: 'white',
      borderRadius: '100px',
      color: theme.palette.primary.main,
      minWidth: '100px',
      fontWeight: 'bold',
      fontSize: '1.2rem',
    },
  },
}));
