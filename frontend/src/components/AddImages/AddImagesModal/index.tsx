import * as React from 'react';
import { connect } from 'react-redux';

import { uploadImages } from '../../../actions';
import withPush from '../../../hocs/Router';
import withWidth from '../../../hocs/WithWidth';
import { StoreState } from '../../../meta/types/Store';
import { User } from '../../../meta/types/User';
import AddImagesModal, { Props as AddImagesModalProps } from './AddImagesModal';

interface Props extends AddImagesModalProps {
  width?: number;
  authUser?: User;
}

const AddImagesModalContainer = ({ uploadImages: uploadImagesA, width, authUser, push }: Props) => {
  return (
    <AddImagesModal uploadImages={uploadImagesA} width={width!} userId={authUser!.id} push={push} />
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
