export const withDimensions = (src: string, width: number, height: number) => {
  return `${src}?d=${width}x${height}`;
};
