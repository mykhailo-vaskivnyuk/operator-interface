import { createStyles } from '@material-ui/core/styles';

export const styles = createStyles({
  wrapper: {
    width: '25%',
    height: '50%',
    display: 'flex',
    flexDirection: 'column',
    '& .display': {
      height: '30%',
    },
    '& .keyboardPieces': {
      flex: '1 0 0',
    },
  },
});
