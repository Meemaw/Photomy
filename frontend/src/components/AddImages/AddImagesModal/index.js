// @flow
import * as React from 'react';
import withWidth from '../../../hocs/WithWidth';
import AddImagesModal from './AddImagesModal';
import withPush from '../../../hocs/Router';
import { connect } from 'react-redux';
import { uploadImages } from '../../../actions';

type Props = { uploadImages: Function, width: number, authUser: Object, push: Function };

const AddImagesModalContainer = ({ uploadImages, width, authUser, push }: Props) => {
  return (
    <AddImagesModal uploadImages={uploadImages} width={width} userId={authUser.id} push={push} />
  );
};

const mapDispatchToProps = {
  uploadImages,
};

function mapStateToProps(state) {
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
