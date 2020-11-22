import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// eslint-disable-next-line import/no-cycle
import { PropsDisplay } from './Display';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      height: '100%',
      backgroundColor: theme.palette.primary.main,
      padding: '1rem 1.5rem 0.3rem',
      borderRadius: '10px 10px 0 0',
      display: 'flex',
      justifyContentL: 'center',
      alignItems: 'center',
      '& .head': {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.5rem',
        marginLeft: '0.5rem',
      },
      '& .input': {
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        fontWeight: 'bold',
        verticalAlign: 'middle',
        backgroundColor: 'white',
        borderRadius: '100px',
        fontSize: '1.2rem',
        flex: '1 0 0',
      },
      '& .input:after': {
        content: "''",
        paddingLeft: ({ state }: PropsDisplay) => (state.isFocus ? '2px' : ''),
        animation: '$cursor 1s infinite',
        background: 'black',
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
