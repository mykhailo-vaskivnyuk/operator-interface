import { createStyles } from '@material-ui/core/styles';

export const styles = createStyles({
  wrapper: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '& .tabs-panel': {
      height: '14%',
      display: 'flex',
    },
    '& .order-panel': {
      flex: '1 0 0',
      display: 'flex',
    },
  },
});
