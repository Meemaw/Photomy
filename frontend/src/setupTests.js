import './tempPolyfills.js';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';

global.enzyme = enzyme;
global.shallow = enzyme.shallow;
global.render = enzyme.render;
global.mount = enzyme.mount;

enzyme.configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true,
});

// Fail tests on any warning
console.error = message => {
  throw new Error(message);
};

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

//
// Chai
//
global.expect = chai.expect;
chai.should();
chai.use(chaiEnzyme());
chai.use(dirtyChai);
chai.use(sinonChai);

global.JSHINT = () => true;
