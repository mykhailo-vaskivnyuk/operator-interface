import { setTimeout } from 'timers';
import {
  IMessageInfo,
  MessageCode,
  MessageType,
  messagesInfo,
} from '../../assets/data/messages.data';
import { IObject } from '../../assets/types/objects.types';

export interface IMessage extends IObject<IStateMessage> {
  sendMessage: (code: MessageCode, text?: string) => void;
  getMessage: () => IMessageInfo;
}

export type IStateMessage = IMessageInfo;

class Message implements IMessage {
  private _code: MessageCode = MessageCode.CLEAR_MESSAGE;

  private _prevCode: MessageCode = MessageCode.CLEAR_MESSAGE;

  private _callbackOnChange?: () => void;

  private _text = '';

  private _prevText = '';

  private _timer: NodeJS.Timeout | null = null;

  constructor() {
    this.getMessage = this.getMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage(code: MessageCode, text?: string) {
    if (this._timer) clearTimeout(this._timer);
    const currentType = messagesInfo[this._code].type;
    const newType = messagesInfo[code].type;
    if (currentType !== MessageType.ERROR) {
      this._prevCode = this._code;
      this._prevText = this._text;
    }
    this._code = code;
    this._text = (code && text) || '';
    if (code !== null && newType === MessageType.ERROR) {
      this._timer = setTimeout(() => {
        this._code = this._prevCode;
        this._text = this._prevText;
        this._onMessage();
      }, 2000);
    }
    this._onMessage();
  }

  onChange(callback: () => void) {
    this._callbackOnChange = callback;
  }

  private _onMessage() {
    if (this._callbackOnChange) this._callbackOnChange();
  }

  getMessage() {
    if (this._code === null) return messagesInfo[MessageCode.CLEAR_MESSAGE];
    const message = { ...messagesInfo[this._code] };
    if (this._text) message.text += `: ${this._text}`;
    return message;
  }

  getStateObject() {
    return this.getMessage();
  }

  off(): void {
    this._callbackOnChange = undefined;
  }
}

let instance: IMessage;

function getInstance(): IMessage {
  if (!instance) {
    instance = new Message();
  }
  return instance;
}

export const MessageService = { getInstance };

export * from '../../assets/data/messages.data';
