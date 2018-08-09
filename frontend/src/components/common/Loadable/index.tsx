import * as L from 'react-loadable';
import Loading from '../Loading';

type Props = {
  loader: any;
};

function Loadable(opts: Props) {
  return L({
    ...opts,
    delay: 200,
    timeout: 10,
    loading: Loading,
  });
}

export default Loadable;
