export enum MessageType {
  INFO,
  WARNING,
  ERROR,
}

export enum MessageCode {
  CLEAR_MESSAGE,
  WEIGHTS_IS_EMPTY,
  WEIGHTS_NOT_STABLE,
  WEIGHTS_IS_SMALL,
  TEST_RIK_CONTROL,
  INTERNAL_ERROR,
}

export interface IMessageInfo {
  type: MessageType;
  text: string;
}

export const messagesInfo: { [key in MessageCode]: IMessageInfo } = {
  [MessageCode.CLEAR_MESSAGE]: { type: MessageType.INFO, text: '' },
  [MessageCode.WEIGHTS_IS_SMALL]: {
    type: MessageType.WARNING,
    text: 'Вага має перевищувати 40гр!',
  },
  [MessageCode.WEIGHTS_IS_EMPTY]: { type: MessageType.ERROR, text: 'Поставте товар на ваги!' },
  [MessageCode.WEIGHTS_NOT_STABLE]: { type: MessageType.WARNING, text: 'Вага не стабільна!' },
  [MessageCode.TEST_RIK_CONTROL]: { type: MessageType.ERROR, text: 'ТЕСТ RIK CONTROL' },
  [MessageCode.INTERNAL_ERROR]: { type: MessageType.ERROR, text: 'INTERNAL ERROR' },
};
