// @flow
import L from 'react-loadable';
import Loading from '../Loading';

function Loadable(opts: Object) {
  return L({
    ...opts,
    delay: 200,
    timeout: 10,
    loading: Loading,
  });
}

export default Loadable;
