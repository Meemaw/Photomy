import * as React from 'react';
import { connect } from 'react-redux';
import { Divider } from 'semantic-ui-react';

import { setIdentity } from '../../../actions';
import { PERSON_PHOTOS_IMAGE_HEIGHT } from '../../../constants/gallerySizes';
import { Identity } from '../../../meta/types/Identity';
import { Image, mapImages } from '../../../meta/types/Image';
import { StoreState } from '../../../meta/types/Store';
import { buildDataMap } from '../../../reducers/gallery/util';
import { IdentityApi, ImagesApi } from '../../../services';
import ClickableSpan from '../../common/ClickableSpan';
import Gallery from '../../Gallery';
import ImageHighlightModal from '../../ImageHighlightModal';
import ImageReviewModal from '../../ImageReviewModal';
import MergeIdentities from '../../MergeIdentities';
import Person from './Person';

type State = {
  images: Image[];
  count: number;
  updatedAt?: Date;
  unconfirmedImages: Image[];
  friends: any;
  identity_id?: number;
};

type Props = {
  setIdentity: any;
  identity?: Identity;
  match: any;
};

const INITIAL_STATE = {
  images: [],
  count: 0,
  updatedAt: undefined,
  unconfirmedImages: [],
  friends: {},
  identity_id: undefined,
};

class PersonContainer extends React.Component<Props, State> {
  state = INITIAL_STATE;

  componentDidMount() {
    const { identity_id } = this.props.match.params;
    this.loadIdentity(identity_id);
  }

  dataMap = {};

  addMergedImages = (newImages: Image[]) => {
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
    if (identity && identity.identity !== newConfirmedImages[0].image_identity) {
      this.props.setIdentity({
        ...identity,
        identity: newConfirmedImages[0].image_identity,
      });
    }
  };

  async loadIdentity(identity_id: number) {
    const friends = await IdentityApi.getNeighbours({ identity_id });
    const data = await ImagesApi.person({ identity_id });
    const identity = await IdentityApi.get({ identity_id });
    const results = mapImages(data.results);

    const confirmedPictures = results.filter(image => image.confirmed);
    const unconfirmedImages = results.filter(image => !image.confirmed);

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

  async componentDidUpdate(prevProps: Props, prevState: State) {
    const { identity_id } = this.props.match.params;

    if (identity_id !== prevState.identity_id) {
      this.props.setIdentity(undefined);
      this.loadIdentity(identity_id);
    }
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { identity_id } = nextProps.match.params;

    if (prevState.identity_id !== identity_id) {
      return {
        ...INITIAL_STATE,
        identity_id,
      };
    }

    return null;
  }

  renderImage = (image: Image): React.ReactNode => {
    const imageIx = this.dataMap[image.image_id].ix;

    return (
      <ImageHighlightModal
        imageIx={imageIx}
        triggerImageMaxHeight={PERSON_PHOTOS_IMAGE_HEIGHT}
        highlightHeaderProvider={() => this.props.identity}
        images={Object.values(this.dataMap)}
        initialImage={image}
      />
    );
  };

  addConfirmations = (confirmationImages: Image[]) => {
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
    const isEmpty = images.length === 0 && updatedAt !== null;

    if (!identity) {
      return null;
    }

    return (
      <Gallery isEmpty={isEmpty}>
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

function mapStateToProps(state: StoreState) {
  return { identity: state.identity.identity };
}

const mapDispatchToProps = {
  setIdentity,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonContainer);
