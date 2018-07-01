export function fireEvent(ref, eventName) {
  if (ref.fireEvent) {
    ref.fireEvent('on' + eventName);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(eventName, true, false);
    ref.dispatchEvent(evObj);
  }
}
