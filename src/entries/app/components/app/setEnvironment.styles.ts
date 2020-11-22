import { createStyles } from '@material-ui/core/styles';

export const styles = createStyles({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%', // `${768 + 10}px`,
    background: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontSize: '5rem',
  },
});
