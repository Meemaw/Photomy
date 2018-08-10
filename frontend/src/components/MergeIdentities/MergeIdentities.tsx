import * as React from 'react';
import { Button, Icon, Message, Modal } from 'semantic-ui-react';

import { ButtonClick } from '../../meta/types/Function';
import { Identity } from '../../meta/types/Identity';
import { ImageIdentityMatch } from '../../meta/types/ImageIdentityMatch';
import { IdentityApi, IdentityMatchApi } from '../../services';
import SaveButton from '../common/SaveButton';
import Gallery from '../Gallery';

type Props = {
  identity: Identity;
  addMergedImages: any;
  handleClose: ButtonClick;
};

type State = {
  join_identity_id?: string;
  loadingIdentities: boolean;
  merging: boolean;
  results: any[];
};

class MergeIdentities extends React.Component<Props, State> {
  state = {
    loadingIdentities: true,
    results: [],
    join_identity_id: undefined,
    merging: false,
  };

  renderImage = (image: ImageIdentityMatch) => {
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

  setSelectedIdentity = (identity_group_id: string) => {
    this.setState({ join_identity_id: identity_group_id });
  };

  async componentDidMount() {
    const data = await IdentityApi.list();
    const identity_ids = data.results.map((identity: Identity) => identity.id);

    let results = (await Promise.all(
      identity_ids.map(async (identity_id: number) => {
        return await IdentityApi.getRepresentatives({ identity_id });
      }),
    )).filter((representatives: any[]) => representatives.length > 0);

    results = results.filter(
      identityMatches => identityMatches[0].identity_group_id !== this.props.identity.id,
    );

    this.setState({ loadingIdentities: false, results });
  }

  handleMergeClick = async (e: any, data: any) => {
    const { identity } = this.props;
    const { join_identity_id } = this.state;
    const base_identity_id = identity.id;

    this.setState({ merging: true });

    const newImages = await IdentityMatchApi.mergeIdentities({
      join_identity_id,
      base_identity_id,
    });
    this.props.addMergedImages(newImages);
    this.props.handleClose(e, data);
  };

  render() {
    const { handleClose } = this.props;
    const { results, loadingIdentities, join_identity_id, merging } = this.state;
    const loading = loadingIdentities || merging;

    const noIdentities = results.length === 0;

    return (
      <React.Fragment>
        <Modal.Header>
          <Icon name="user" />
          Merge identities with
        </Modal.Header>
        <Modal.Content>
          {noIdentities ? (
            <Message content="No identities to merge with" />
          ) : (
            results.map((identityMatches, ix) => {
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
            })
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button content="Cancel" icon="remove" onClick={handleClose} />
          {!noIdentities && (
            <SaveButton
              content="Merge identities"
              icon="checkmark"
              loading={loading}
              onClick={this.handleMergeClick}
              disabled={join_identity_id === null}
            />
          )}
        </Modal.Actions>
      </React.Fragment>
    );
  }
}

export default MergeIdentities;
