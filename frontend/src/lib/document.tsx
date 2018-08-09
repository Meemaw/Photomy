export const enterFullscren = (ref: any) => {
  if (!ref) {
    return;
  }
  if (ref.requestFullscreen) {
    ref.requestFullscreen();
  } else if (ref.webkitRequestFullscreen) {
    ref.webkitRequestFullscreen();
  } else if (ref.mozRequestFullScreen) {
    ref.mozRequestFullScreen();
  } else if (ref.msRequestFullscreen) {
    ref.msRequestFullscreen();
  }
};
