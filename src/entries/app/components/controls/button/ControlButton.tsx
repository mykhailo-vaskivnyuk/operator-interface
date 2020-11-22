import React, { useEffect, ComponentType, FunctionComponent } from 'react';
import { StyledComponentProps } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import { useStyles } from './controlButton.styles';
import { Mode } from '../../../assets/types/types';
import { Modal } from '../../main/Modal';
import { useControlButton, PropsButton } from './controlButton.hook';
import { IControlButton } from './controlButton.class';
import { withState } from '../../../assets/helpers/connect.state.object';

export interface IControlButtonProps<B extends IControlButton> {
  button: { new (): B };
  ModalComponent: ComponentType<{ button: B }> & StyledComponentProps;
  IconComponent: FunctionComponent<Record<string, unknown>>;
  text: string;
}

export function createControlButton<B extends IControlButton>(
  props: IControlButtonProps<B>,
): ComponentType<Omit<PropsButton<B>, 'state' | 'classes'>> {
  const { button, ModalComponent, IconComponent, text } = props;

  function ControlButton(ps: PropsButton<B>) {
    const { onClick, setActive } = useControlButton(ps);
    const { isActive, state } = ps;
    const { mode, currentIsActive } = state.getStateObject();
    const classes = useStyles(currentIsActive);
    const { t } = useTranslation();
    useEffect(() => setActive(isActive), [setActive, isActive]);

    return (
      <>
        <button type="button" className={classes.wrapper} onClick={onClick}>
          <IconComponent />
          <div>{t(text)}</div>
        </button>
        {mode === Mode.MODAL ? (
          <Modal>
            <ModalComponent button={state} />
          </Modal>
        ) : null}
      </>
    );
  }

  ControlButton.defaultProps = {
    isActive: undefined,
    onAction: undefined,
    doAction: undefined,
  };

  const ControlButtonWithObject = withState<B, PropsButton<B>>(button, ControlButton);

  return ControlButtonWithObject;
}
