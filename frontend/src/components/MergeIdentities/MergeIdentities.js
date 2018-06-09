import React from 'react';
import { Modal, Icon, Button } from 'semantic-ui-react';
import { IdentityApi, IdentityMatchApi } from '../../services';
import Gallery from '../Gallery';
import SaveButton from '../common/SaveButton';

class MergeIdentities extends React.Component {
  state = { loadingIdentities: true, results: [], join_identity_id: null, merging: false };

  renderImage = (image: Image) => {
    return (
      <Gallery.Image
        src={image.preview_url}
        height="auto"
        width="100%"
        style={{ objectFit: 'cover' }}
        onClick={() => this.setSelectedIdentity(image.identity_group_id)}
      />
    );
  };

  setSelectedIdentity = identity_group_id => {
    this.setState({ join_identity_id: identity_group_id });
  };

  async componentDidMount() {
    const data = await IdentityApi.list();
    const identity_ids = data.results.map(x => x.id);

    let results = (await Promise.all(
      identity_ids.map(async identity_id => {
        return await IdentityApi.getRepresentatives({ identity_id });
      }),
    )).filter(x => x.length > 0);

    results = results.filter(
      identityMatches => identityMatches[0].identity_group_id !== this.props.identity.id,
    );

    this.setState({ loadingIdentities: false, results });
  }

  handleMergeClick = async () => {
    const { identity } = this.props;
    const { join_identity_id } = this.state;
    const base_identity_id = identity.id;

    this.setState({ merging: true });

    const newImages = await IdentityMatchApi.mergeIdentities({
      join_identity_id,
      base_identity_id,
    });
    this.props.addMergedImages(newImages);
    this.props.handleClose();
  };

  render() {
    const { handleClose } = this.props;
    const { results, loadingIdentities, join_identity_id, merging } = this.state;
    const loading = loadingIdentities || merging;

    return (
      <React.Fragment>
        <Modal.Header>
          <Icon name="user" />Merge identities with
        </Modal.Header>
        <Modal.Content>
          {results.map((identityMatches, ix) => {
            const sectionHeader = identityMatches[0].image_identity || `Unknown identity`;
            const key = identityMatches[0].identity_group_id;
            const isSelected = key === join_identity_id;
            return (
              <Gallery.Section
                renderImage={this.renderImage}
                sectionHeader={sectionHeader}
                isSelected={isSelected}
                key={key}
                images={identityMatches}
                isSticky={false}
                minImageWidth={90}
              />
            );
          })}
        </Modal.Content>
        <Modal.Actions>
          <Button content="Cancel" icon="remove" onClick={handleClose} />
          <SaveButton
            content="Merge identities"
            icon="yc"
            loading={loading}
            onClick={this.handleMergeClick}
            disabled={join_identity_id === null}
          />
        </Modal.Actions>
      </React.Fragment>
    );
  }
}

export default MergeIdentities;
