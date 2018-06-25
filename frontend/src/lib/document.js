export const enterFullscren = ref => {
  if (!ref) return;
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
