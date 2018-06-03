const KEY_PRESS = 'keyPress';
const ENTER = 'Enter';
const CLICK = 'click';
const CHANGE = 'change';

const changeEvent = value => ({ target: { value: value } });

const keyPressEvent = value => ({ key: value });

const pressEnter = () => keyPressEvent(ENTER);

export const simulateEnter = wrapper => wrapper.simulate(KEY_PRESS, pressEnter());

export const simulateChange = (wrapper, value) => wrapper.simulate(CHANGE, changeEvent(value));

export const simulateClick = wrapper => wrapper.simulate(CLICK);
