import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useBaseStyles = makeStyles((theme: Theme) =>
  createStyles({
    layout: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      '& [class*=row]': {
        flex: '1 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        maxHeight: (props: Record<string, string>) => props.keyHeight,
      },
      '& .row-1': {},
      '& .row-2': {},
      '& .row-3': {},
      '& .row-4': {},
      '& .key': {
        cursor: 'pointer',
        color: 'black',
        border: '1px solid',
        borderColor: 'black', // theme.palette.primary.main,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '0.3rem',
        fontSize: '1.1rem',
        background: theme.palette.secondary.light,
        overflow: 'hidden',
        fontWeight: 600,
        height: '100%',
        width: (props: Record<string, string>) => props.keyWidth,
        marginRight: (props: Record<string, string>) => props.keySpace,
        '&:last-child': {
          marginRight: '0px',
        },
      },
    },
  }),
);
