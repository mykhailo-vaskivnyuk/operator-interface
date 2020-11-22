import React from 'react';
import ReactDOM from 'react-dom';

export class Modal extends React.Component {
  modal: HTMLDivElement;

  modalRoot: HTMLElement | null;

  constructor(props: React.PropsWithChildren<Record<string, unknown>>) {
    super(props);
    this.modalRoot = document.getElementById('modal-root');
    this.modal = document.createElement('div');
    this.modal.id = 'modal';
  }

  componentDidMount(): void {
    this.modalRoot?.appendChild(this.modal);
  }

  componentWillUnmount(): void {
    this.modalRoot?.removeChild(this.modal);
  }

  render(): React.ReactNode {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.modal);
  }
}
