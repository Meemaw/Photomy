export function fireEvent(ref: any, eventName: string) {
  if (ref.fireEvent) {
    ref.fireEvent('on' + eventName);
  } else {
    const evObj = document.createEvent('Events');
    evObj.initEvent(eventName, true, false);
    ref.dispatchEvent(evObj);
  }
}
