import React, { FunctionComponent, Component } from 'react';
import { IObject, ComponentState } from '../types/objects.types';

type TGetStateObject = ReturnType<IObject<unknown>['getStateObject']>;

type IClassOrObject<O extends IObject<TGetStateObject>, OP extends unknown> =
  | { new (props: OP): O }
  | { getInstance: (props: OP) => O };

type OriginProps<P> = Omit<P, 'state'>;

let time = 0;

export function withState<
  O extends IObject<TGetStateObject>,
  P extends { state: O },
  OP = OriginProps<P>
>(
  ClassOrObject: IClassOrObject<O, OP>,
  FCComponent: FunctionComponent<OP & ComponentState<O>>,
): React.ComponentClass<OP, ComponentState<O>> {
  const ComponentWrapper = class extends Component<OP, ComponentState<O>> {
    constructor(props: OP) {
      super(props);
      this.state = {} as ComponentState<O>;
    }

    componentDidMount() {
      setTimeout(() => {
        this.forceUpdate = this.forceUpdate.bind(this);
        let state: O;
        if (typeof ClassOrObject === 'function') {
          state = new ClassOrObject(this.props);
          state.onChange(this.forceUpdate);
        } else {
          state = ClassOrObject.getInstance(this.props);
          state.onChange(this.forceUpdate);
        }
        this.setState({ state });
      }, (time += 0) * 500);
    }

    componentWillUnmount() {
      const { state } = this.state;
      if (state.off) state.off(this.forceUpdate);
    }

    render() {
      const { state } = this.state;
      if (!state) return null;
      return React.createElement(FCComponent, { ...this.props, state }, []);
    }
  };

  Object.assign(ComponentWrapper.prototype.constructor, {
    displayName: `${FCComponent.name}State`,
  });

  return ComponentWrapper;
}

export * from '../types/objects.types';
