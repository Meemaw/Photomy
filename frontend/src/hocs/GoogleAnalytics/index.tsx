import * as React from 'react';
import * as GoogleAnalytics from 'react-ga';

import { RouteComponentProps } from '../../../node_modules/@types/react-router';
import { CONFIG } from '../../lib/core';
import { HOC } from '../../meta/types/Hoc';

GoogleAnalytics.initialize(CONFIG.GoogleAnalytics.trackingId);

export interface RouteProps extends RouteComponentProps<any> {}

const trackPage = (page: any, options: any) => {
  GoogleAnalytics.set({
    page,
    ...options,
  });
  GoogleAnalytics.pageview(page);
};

const withTracker = <P, S>(
  WrappedComponent: HOC<P, object>,
  options = { debug: CONFIG.GoogleAnalytics.debug },
) => {
  const hoc = class extends React.Component<RouteProps & P, S> {
    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page, options);
    }

    componentWillReceiveProps(nextProps: RouteProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage, options);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return hoc;
};

export default withTracker;
