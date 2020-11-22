import { createStyles } from '@material-ui/core/styles';

export const styles = createStyles({
  wrapper: {
    height: '100%',
    display: 'flex',
    padding: '1rem',
    // paddingRight: '1rem',
    '& .letters': {
      width: '60%',
      marginRight: '2%',
    },
    '& .nums': {
      flex: '1 0 0',
      marginRight: '1.8%',
    },
    '& .func': {
      width: '15%',
    },
  },
});
