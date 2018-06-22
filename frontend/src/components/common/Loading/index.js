// @flow
import React from 'react';
import { Loader } from 'semantic-ui-react';

type Props = { content?: string };

export default ({ content = 'Loading' }: Props) => <Loader active content={content} />;
