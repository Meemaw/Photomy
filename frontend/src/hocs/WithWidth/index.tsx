import * as React from 'react';
import { Visibility, VisibilityEventData } from 'semantic-ui-react';

import { HOC } from '../../meta/types/Hoc';

type WidthState = { width?: number };

const withWidth = <P, S>(WrappedComponent: HOC<P, WidthState>) => {
  return class WithWidth extends React.Component<P & WidthState, WidthState> {
    state = { width: undefined };

    handleUpdate = (_: any, data: VisibilityEventData) => {
      const {
        calculations: { width },
      } = data;
      if (width !== this.state.width) {
        this.setState({ width });
      }
    };

    render() {
      const { width } = this.state;
      return (
        <Visibility onUpdate={this.handleUpdate} fireOnMount={true}>
          {width !== undefined ? <WrappedComponent {...this.props} width={width} /> : null}
        </Visibility>
      );
    }
  };
};

export default withWidth;
