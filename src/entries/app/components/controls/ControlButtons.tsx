import CloseIcon from '@material-ui/icons/CheckCircle';
import PrintIcon from '@material-ui/icons/Print';
import TaraIcon from '@material-ui/icons/Speed';
import { createControlButton, IControlButtonProps } from './button/ControlButton';
import { ControlButton, IControlButton } from './button/controlButton.class';
import { CloseModal } from './close/CloseModal';
import { PrintModal } from './print/PrintModal';
import { TaraButton, ITaraButton } from '../tara/taraButton.class';
import { TaraModal } from '../tara/tara.modal/TaraModal';

const propsClose: IControlButtonProps<IControlButton> = {
  ModalComponent: CloseModal,
  button: ControlButton,
  IconComponent: CloseIcon,
  text: 'close',
};

const propsPrint: IControlButtonProps<IControlButton> = {
  button: ControlButton,
  ModalComponent: PrintModal,
  IconComponent: PrintIcon,
  text: 'print',
};

const propsTara: IControlButtonProps<ITaraButton> = {
  button: TaraButton,
  ModalComponent: TaraModal,
  IconComponent: TaraIcon,
  text: 'tara',
};

export const Buttons = {
  CloseButton: createControlButton(propsClose),
  PrintButton: createControlButton(propsPrint),
  TaraButton: createControlButton(propsTara),
};
