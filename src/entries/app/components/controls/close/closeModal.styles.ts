import { createStyles, Theme } from '@material-ui/core/styles';

export const styles = createStyles((theme: Theme) => ({
  wrapper: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    width: '40%',
    height: '50%',
    borderRadius: '1.5rem',
    fontSize: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    '& .title': {
      padding: '10%',
      textAlign: 'center',
    },
    '& .controls': {
      display: 'flex',
      justifyContent: 'space-evenly',
    },
    '& .btn': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '3.5rem',
      width: '4.5rem',
      border: '1px solid black',
      borderRadius: '0.5rem',
      outline: 'none',
    },
  },
}));
