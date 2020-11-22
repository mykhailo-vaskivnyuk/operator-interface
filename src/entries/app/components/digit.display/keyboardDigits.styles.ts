import { createStyles } from '@material-ui/core/styles';

export const styles = createStyles({
  wrapper: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: '0 0 0.5rem 0.5rem',
    display: 'flex',
    padding: '0.5rem',
    '& .nums': {
      width: '79%',
      marginRight: '1rem',
    },
    '& .func': {
      flex: '1 0 0',
    },
  },
});
