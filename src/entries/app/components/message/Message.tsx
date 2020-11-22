import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { styles } from './message.styles';
import { MessageType } from '../../assets/data/messages.data';
import { MessageService, IMessage } from './message.class';
import { withState, ComponentState } from '../../assets/helpers/connect.state.object';

type Props = WithStyles & ComponentState<IMessage>;

function MessageComponent({ classes, state: message }: Props) {
  const { type, text } = message.getStateObject();
  const { t } = useTranslation();

  const className = type === MessageType.ERROR ? 'message error' : 'message';
  return (
    <div className={classes.wrapper}>
      <div className={className}>{t(text)}</div>
    </div>
  );
}

const MessageWithObject = withState<IMessage, Props>(MessageService, MessageComponent);

export const Message = withStyles(styles)(MessageWithObject);
