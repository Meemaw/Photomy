// @flow
import * as React from 'react';
import Gallery from '../../Gallery';
import People from '../People/People';
import withPush from '../../../hocs/Router';
import type { Image } from '../../../meta/types/Image';
import { PERSON_PHOTOS_IMAGE_HEIGHT } from '../../../constants/gallerySizes';

type Props = {
  images: Array<Image>,
  count: number,
  updatedAt: ?Date,
  identity: Object,
  friends: Object,
  renderImage: Image => React.Node,
};

// TODO make nicer

const Person = ({ images, count, updatedAt, identity, friends, renderImage }: Props) => {
  const ofWhat = `Images of ${identity.identity || 'Person'}`;

  const friendsData = {
    images: friends.results || [],
    coubt: friends.count,
    updatedAt: new Date(),
  };

  return (
    <React.Fragment>
      <Gallery.Section
        images={images}
        sectionHeader="Photos"
        renderImage={renderImage}
        minImageWidth={PERSON_PHOTOS_IMAGE_HEIGHT}
      />
      <Gallery.FooterInfo count={count} updatedAt={updatedAt} ofWhat={ofWhat} />
      {friendsData.images.length > 0 && <Friends {...friendsData} />}
    </React.Fragment>
  );
};

const Friends = withPush(People);

export default Person;
