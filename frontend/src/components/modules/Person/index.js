// @flow
import * as React from 'react';
import Person from './Person';
import ClickableSpan from '../../common/ClickableSpan';
import ImageReviewModal from '../../ImageReviewModal';
import Gallery from '../../Gallery';
import ImageHighlightModal from '../../ImageHighlightModal';
import MergeIdentities from '../../MergeIdentities';
import type { Image } from '../../../meta/types/Image';
import { ImagesApi, IdentityApi } from '../../../services';
import { connect } from 'react-redux';
import { setIdentity } from '../../../actions';
import { Divider } from 'semantic-ui-react';
import { PERSON_PHOTOS_IMAGE_HEIGHT } from '../../../constants/gallerySizes';
import { buildDataMap } from '../../../reducers/gallery';

type State = {
  images: Array<Image>,
  count: number,
  updatedAt: ?Date,
  unconfirmedImages: Array<Image>,
  friends: Object,
  identity_id: ?number,
};

type Props = {
  match: Object,
  setIdentity: Object => void,
  identity: Object,
  match: Object,
};

const INITIAL_STATE = {
  images: [],
  count: 0,
  updatedAt: null,
  unconfirmedImages: [],
  friends: {},
  identity_id: null,
};

class PersonContainer extends React.Component<Props, State> {
  state = INITIAL_STATE;

  componentDidMount() {
    const { identity_id } = this.props.match.params;
    this.loadIdentity(identity_id);
  }

  dataMap = {};

  addMergedImages = newImages => {
    const newConfirmedImages = newImages.filter(image => image.confirmed);
    const newUnconfirmedImages = newImages.filter(image => !image.confirmed);

    const { images, unconfirmedImages } = this.state;

    const mergedConfirmedImages = [...images, ...newConfirmedImages];
    const mergedUnconfirmedImages = [...unconfirmedImages, ...newUnconfirmedImages];

    this.dataMap = buildDataMap(mergedConfirmedImages);

    this.setState({
      images: mergedConfirmedImages,
      unconfirmedImages: mergedUnconfirmedImages,
      count: mergedConfirmedImages.length,
    });
    const { identity } = this.props;
    if (identity.identity !== newConfirmedImages[0].image_identity) {
      this.props.setIdentity({ ...identity, identity: newConfirmedImages[0].image_identity });
    }
  };

  async loadIdentity(identity_id) {
    const friends = await IdentityApi.getNeighbours({ identity_id });
    const data = await ImagesApi.person({ identity_id });
    const identity = await IdentityApi.get({ identity_id });
    const confirmedPictures = data.results.filter(image => image.confirmed);
    const unconfirmedImages = data.results.filter(image => !image.confirmed);

    console.log(confirmedPictures);

    this.dataMap = buildDataMap(confirmedPictures);

    this.setState(
      {
        images: confirmedPictures,
        unconfirmedImages,
        count: confirmedPictures.length,
        updatedAt: new Date(),
        friends,
        identity_id,
      },
      () => this.props.setIdentity(identity),
    );
  }

  async componentDidUpdate(prevProps, prevState) {
    const { identity_id } = this.props.match.params;

    if (identity_id !== prevState.identity_id) {
      this.props.setIdentity({});
      this.loadIdentity(identity_id);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { identity_id } = nextProps.match.params;

    if (prevState.identity_id !== identity_id) {
      return {
        ...INITIAL_STATE,
        identity_id,
      };
    }

    return null;
  }

  renderImage = (image: Image): React.Node => {
    const imageIx = this.dataMap[image.image_id].ix;

    return (
      <ImageHighlightModal
        imageIx={imageIx}
        triggerImageMaxHeight={PERSON_PHOTOS_IMAGE_HEIGHT}
        highlightHeaderProvider={() => this.props.identity.identity}
        images={Object.values(this.dataMap)}
        initialImage={image}
      />
    );
  };

  addConfirmations = (confirmationImages: Array<Image>) => {
    this.setState(prevState => {
      const newImages = [...prevState.images, ...confirmationImages];

      this.dataMap = newImages.reduce((acc, image, ix) => {
        acc[image.image_id] = { ...image, ix };
        return acc;
      }, {});

      return {
        images: newImages,
        count: newImages.length,
        updatedAt: new Date(),
        unconfirmedImages: [],
      };
    });
  };

  render() {
    const { unconfirmedImages, count, updatedAt, friends, images } = this.state;
    const { identity } = this.props;

    return (
      <Gallery>
        <Person
          images={images}
          count={count}
          updatedAt={updatedAt}
          friends={friends}
          identity={identity}
          renderImage={this.renderImage}
        />
        <Divider />

        {unconfirmedImages.length > 0 && (
          <ImageReviewModal
            unreviewedImages={unconfirmedImages}
            identity={identity}
            addConfirmations={this.addConfirmations}
          />
        )}

        <div style={{ textAlign: 'center' }}>
          <ClickableSpan fontWeight={500}>Remove from people album</ClickableSpan>
        </div>
        <Divider />
        <div style={{ textAlign: 'center' }}>
          <MergeIdentities identity={identity} addMergedImages={this.addMergedImages} />
        </div>
        <Divider />
      </Gallery>
    );
  }
}

function mapStateToProps(state) {
  return { identity: state.identity };
}

const mapDispatchToProps = {
  setIdentity,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonContainer);
