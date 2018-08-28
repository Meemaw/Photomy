import * as React from 'react';

import { HOC } from '../../meta/types/Hoc';

type HoveredState = {
  hovered?: boolean;
};

function withHover<P, S>(WrappedComponent: HOC<P, HoveredState>) {
  return class WithHover extends React.Component<P, HoveredState> {
    state = { hovered: false };

    onMouseEnter = () => this.setState({ hovered: true });

    onMouseLeave = () => this.setState({ hovered: false });

    render() {
      return (
        <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
          <WrappedComponent {...this.props} {...this.state} />
        </div>
      );
    }
  };
}

export default withHover;
