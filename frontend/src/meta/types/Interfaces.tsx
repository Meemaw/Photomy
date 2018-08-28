import { ImageFile } from '../../../node_modules/@types/react-dropzone';
import { LinkImageFile } from '../../components/common/ImageLinkUpload';
import { Push } from '../../hocs/Router';
import { HandleClose } from './Function';

export interface InModal {
  handleClose: HandleClose;
}

export interface RoutePusher {
  push: Push;
}

export interface WidthMeasured {
  width: number;
}

export type Uploadable = ImageFile | LinkImageFile;
