import * as React from 'react';
import { Visibility } from 'semantic-ui-react';

const withWidth = WrappedComponent => {
  return class WithWidth extends React.PureComponent {
    state = {};

    handleUpdate = (e, { calculations: { width } }) => {
      if (width !== this.state.width) {
        this.setState({ width });
      }
    };

    render() {
      const { width } = this.state;
      return (
        <Visibility onUpdate={this.handleUpdate} fireOnMount={true}>
          {width && <WrappedComponent {...this.props} width={width} />}
        </Visibility>
      );
    }
  };
};

export default withWidth;
