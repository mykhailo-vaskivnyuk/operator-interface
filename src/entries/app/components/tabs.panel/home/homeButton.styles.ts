import { createStyles, Theme } from '@material-ui/core/styles';

export const styles = createStyles((theme: Theme) => ({
  wrapper: {
    width: '12%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.secondary.dark,
    cursor: 'pointer',
  },
}));
