import * as React from 'react';
import { connect } from 'react-redux';

import { uploadImages } from '../../../actions';
import withPush from '../../../hocs/Router';
import withWidth from '../../../hocs/WithWidth';
import { StoreState } from '../../../meta/types/Store';
import AddImagesModal from './AddImagesModal';

type Props = {
  uploadImages: any;
  width?: number;
  authUser: any;
  push: any;
};

const AddImagesModalContainer = ({
  uploadImages: uploadImagesAction,
  width,
  authUser,
  push,
}: Props) => {
  return (
    <AddImagesModal
      uploadImages={uploadImagesAction}
      width={width!}
      userId={authUser.id}
      push={push}
    />
  );
};

const mapDispatchToProps = {
  uploadImages,
};

function mapStateToProps(state: StoreState) {
  return {
    authUser: state.auth.user,
  };
}

const AddAlbumWithWidth = withWidth(AddImagesModalContainer);
const AddAlbumWithPush = withPush(AddAlbumWithWidth);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddAlbumWithPush);
