import { push } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';

import { HOC } from '../../meta/types/Hoc';

interface PropsWithPush {
  push: any;
}

function withPush<P, S>(WrappedComponent: HOC<P, PropsWithPush>) {
  const hoc = class WithPush extends React.Component<P & PropsWithPush, S> {
    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };

  const connected = connect(
    null,
    { push },
  )(hoc);

  return connected;
}

export default withPush;
