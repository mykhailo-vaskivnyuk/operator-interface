import { createStyles, Theme } from '@material-ui/core/styles';

export const styles = createStyles((theme: Theme) => ({
  grid: {
    height: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: '30% 75%',
    backgroundColor: theme.palette.secondary.light,
    border: '1px solid white',
    color: theme.palette.primary.main,
    '& .val, span': {
      fontSize: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50%',
      color: 'black',
    },
    '& span.val': {
      fontSize: '1.2rem',
      height: '100%',
      width: '100%',
    },
    '& .title': {
      gridColumn: '1/4',
      gridRow: '1',
      display: 'flex',
      alignItems: 'center',
    },
    '& .tara': {
      gridColumn: '1/2',
      gridRow: '2',
    },
    '& .weight': {
      gridColumn: '2/3',
      gridRow: '2',
    },
    '& .price': {
      gridColumn: '3/4',
      gridRow: '2',
    },
    '& .total': {
      gridColumn: '4/5',
      gridRow: '1/3',
    },
    '& .border': {
      border: '1px solid white',
    },
  },
}));
