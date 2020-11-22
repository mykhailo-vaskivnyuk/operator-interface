import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { styles } from './setEnvironment.styles';

type Props = {
  setEnvironment: (rect: DOMRect) => void;
} & WithStyles;

function SetEnvironmentComponent({ classes, setEnvironment }: Props) {
  const ref: React.RefObject<HTMLDivElement> = React.useRef(null);

  React.useLayoutEffect(() => {
    const elem: HTMLDivElement | null = ref.current;
    if (!elem) return;
    const rect: DOMRect = elem.getBoundingClientRect();
    setEnvironment(rect);
  }, [setEnvironment]);

  return (
    <div ref={ref} className={classes.wrapper}>
      APP START ...
    </div>
  );
}

export const SetEnvironment = withStyles(styles)(SetEnvironmentComponent);
