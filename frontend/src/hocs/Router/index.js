import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

function withPush(WrappedComponent) {
  return connect(
    null,
    { push },
  )(
    class WithPush extends React.PureComponent {
      render() {
        return <WrappedComponent {...this.props} {...this.state} />;
      }
    },
  );
}

export default withPush;
