import type { ProcessingStatus } from './ProcessingStatus';
import type { Album } from './Album';

export type ImageId = string;

export type Image = {
  image_id: ImageId,
  image_url: string,
  uploaded_at: Date,
  taken_on: ?Date,
  favorite: boolean,
  description: ?string,
  location: ?string,
  processing_status: ProcessingStatus,
  albums: Array<Album>,
};
