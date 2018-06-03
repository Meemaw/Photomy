export type ImageId = string;

export type Image = {
  image_id: ImageId,
  image_url: string,
  uploaded_at: moment,
  favorite: boolean,
};
