import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// eslint-disable-next-line import/no-cycle
import { PropsSearch } from './Search';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      backgroundColor: theme.palette.primary.main,
      width: '70%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 1.5rem',
      '& .input': {
        flex: '1 0 0',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        backgroundColor: 'white',
        borderRadius: '100px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        overflow: 'hidden',
        whiteSpace: 'break-spaces',
      },
      '& .input:after': {
        content: "''",
        paddingLeft: ({ state }: PropsSearch) => (state.isFocus ? '3px' : ''),
        animation: '$cursor 1s infinite',
        background: theme.palette.secondary.dark,
        opacity: 0,
      },
    },
    '@keyframes cursor': {
      '0%': { opacity: 0 },
      '40%': { opacity: 1 },
      '100%': { opacity: 0 },
    },
  }),
);
