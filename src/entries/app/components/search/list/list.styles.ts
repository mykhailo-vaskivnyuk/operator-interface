import { createStyles, Theme } from '@material-ui/core/styles';

export const styles = createStyles((theme: Theme) => ({
  list: {
    backgroundColor: theme.palette.primary.light,
    border: `solid 3px ${theme.palette.primary.main}`,
    borderTop: 'none',
    borderRight: 'none',
    position: 'absolute',
    top: '17%',
    left: '0px',
    width: 'calc(100% - 3px)',
    height: '83%',
    overflowY: 'auto',
    '& .li': {
      display: 'flex',
      alignItems: 'center',
      height: '2.5rem',
      fontSize: '1.1rem',
      borderBottom: `solid 1px ${theme.palette.secondary.dark}`,
      paddingLeft: '2rem',
      paddingRight: '5rem',
      backgroundColor: 'white',
      '&:first-child': {
        borderTop: `solid 1px ${theme.palette.secondary.dark}`,
      },
    },
    '& span': {
      display: 'inline-block',
      overflow: 'hidden',
      height: '1.5rem',
      '&:first-child': {
        width: '7%',
        marginRight: '2rem',
        textAlign: 'right',
      },
      '&:nth-child(2)': {
        width: '55%',
      },
      '&:nth-child(3)': {
        flex: '1 0 0',
        textAlign: 'right',
      },
    },
  },
  notFound: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.main,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
}));

export const listVirtualizedStyle = {
  width: '100%',
  height: '100%',
};
