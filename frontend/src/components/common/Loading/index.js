import React from 'react';
import { Loader } from 'semantic-ui-react';
export default ({ content = 'Loading' }) => <Loader active content={content} />;
