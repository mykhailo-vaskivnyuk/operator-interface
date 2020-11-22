import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      flex: '1 0 0',
      borderRadius: '0 .4rem .4rem 0',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: (isActive: boolean) =>
        isActive ? theme.palette.primary.main : theme.palette.primary.light,
      cursor: 'pointer',
      border: 'none',
      outline: 'none',
      '&:first-child': {
        marginBottom: '2px',
      },
      '&:last-child ': {
        marginTop: '2px',
      },
    },
  }),
);
