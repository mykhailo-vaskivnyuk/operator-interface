import { createStyles } from '@material-ui/core/styles';

export const styles = createStyles({
  wrapper: {
    flex: '1 0 0',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '& .search-panel': {
      height: '17%',
      display: 'flex',
    },
    '& .order-items': {
      flex: '1 0 0',
      overflowY: 'auto',
    },
  },
});
