// @flow
import React from 'react';
import BaseModal from '../common/BaseModal';
import ClickableSpan from '../common/ClickableSpan';
import MergeIdentities from './MergeIdentities';

type Props = { identity: Object, addMergedImages: Function };
type State = {};

class MergeIdentitiesContainer extends React.Component<Props, State> {
  renderTrigger = (handleOpen: Function) => {
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
