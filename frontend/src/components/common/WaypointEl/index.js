// @flow
import React from 'react';

type Props = { innerRef?: Object };

const WaypointEl = ({ innerRef }: Props) => <div style={{ height: 4 }} ref={innerRef} />;

export default WaypointEl;
