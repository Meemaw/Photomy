import * as React from 'react';

import { SpanClick } from '../../meta/types/Function';
import { Identity } from '../../meta/types/Identity';
import BaseModal from '../common/BaseModal';
import ClickableSpan from '../common/ClickableSpan';
import MergeIdentities from './MergeIdentities';

type Props = { identity: Identity; addMergedImages: any };

class MergeIdentitiesContainer extends React.Component<Props, object> {
  renderTrigger = (handleOpen: SpanClick) => {
    return (
      <ClickableSpan fontWeight={500} onClick={handleOpen}>
        Merge identities
      </ClickableSpan>
    );
  };
  render() {
    const { identity, addMergedImages } = this.props;
    return (
      <BaseModal size="small" trigger={this.renderTrigger} closeOnDimmerClick={false}>
        {handleClose => (
          <MergeIdentities
            identity={identity}
            handleClose={handleClose}
            addMergedImages={addMergedImages}
          />
        )}
      </BaseModal>
    );
  }
}

export default MergeIdentitiesContainer;
