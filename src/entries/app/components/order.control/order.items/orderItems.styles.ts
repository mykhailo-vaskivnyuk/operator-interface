import { createStyles, Theme } from '@material-ui/core/styles';

export const styles = createStyles((theme: Theme) => ({
  wrapper: {
    height: '100%',
    maxHeight: '100%',
    backgroundColor: theme.palette.secondary.light,
    border: `solid 3px ${theme.palette.primary.main}`,
    borderTop: 'none',
    overflowY: 'auto',
    '& ul': {
      listStyle: 'none',
      margin: '0px',
      padding: '0px',
    },
    '& li': {
      display: 'flex',
      alignItems: 'center',
      height: '2.5rem',
      fontSize: '1.1rem',
      borderBottom: `solid 1px ${theme.palette.secondary.dark}`,
      paddingLeft: '2rem',
      paddingRight: '6.8rem',
      backgroundColor: 'white',
      '&:first-child': {
        borderTop: `solid 1px ${theme.palette.secondary.dark}`,
      },
    },
    '& span': {
      display: 'inline-block',
      overflow: 'hidden',
      height: '1.5rem',
      textAlign: 'right',
      '&:first-child': {
        width: '7%',
        marginRight: '2rem',
      },
      '&:nth-child(2)': {
        width: '50%',
        textAlign: 'left',
      },
      '&:nth-child(3)': {
        width: '12%',
      },
      '&:nth-child(4)': {
        width: '12%',
      },
      '&:nth-child(5)': {
        flex: '1 0 0',
        textAlign: 'right',
      },
    },
    '& .selected': {
      backgroundColor: theme.palette.secondary.dark,
      color: 'white',
    },
  },
}));
