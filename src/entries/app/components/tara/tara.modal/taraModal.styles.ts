import { createStyles, makeStyles } from '@material-ui/core/styles';

export const styles = createStyles({
  wrapper: {
    width: '50%',
    height: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    '& .keyboardTaraFix': {
      width: '49%',
      height: '100%',
    },
  },
});

export const useDigitDisplayStyles = makeStyles(
  createStyles({
    wrapper: {
      width: '49%',
      height: '100%',
    },
  }),
);
