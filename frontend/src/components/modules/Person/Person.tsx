import * as React from 'react';

import { PERSON_PHOTOS_IMAGE_HEIGHT } from '../../../constants/gallerySizes';
import withPush from '../../../hocs/Router';
import { Identity } from '../../../meta/types/Identity';
import { Image } from '../../../meta/types/Image';
import Gallery from '../../Gallery';
import People from '../People/People';

type Props = {
  images: Image[];
  count: number;
  updatedAt?: Date;
  identity: Identity;
  friends: any;
  renderImage: (image: Image) => React.ReactNode;
};

const Person = ({ images, count, updatedAt, identity, friends, renderImage }: Props) => {
  const ofWhat = `Images of ${identity ? identity.identity! : 'Person'}`;

  const friendsData: any = {
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
