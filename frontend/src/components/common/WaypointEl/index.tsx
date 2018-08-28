import * as React from 'react';
import { RefFunction } from '../../../meta/types/Function';

type Props = {
  innerRef?: RefFunction;
};

const WaypointEl = ({ innerRef }: Props) => <div style={{ height: 4 }} ref={innerRef} />;

export default WaypointEl;
