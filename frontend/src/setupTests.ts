import './tempPolyfills.tsx';

import * as chai from 'chai';
import * as chaiEnzyme from 'chai-enzyme';
import * as dirtyChai from 'dirty-chai';
import * as enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as sinonChai from 'sinon-chai';

const globalAny: any = global;

globalAny.enzyme = enzyme;
globalAny.shallow = enzyme.shallow;
globalAny.render = enzyme.render;
globalAny.mount = enzyme.mount;

enzyme.configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true,
});

// Fail tests on any warning
console.error = (message: any) => {
  console.log(message);
  throw new Error(message);
};

class LocalStorageMock {
  store: object;

  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: any) {
    this.store[key] = value.toString();
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

globalAny.localStorage = new LocalStorageMock();

//
// Chai
//
globalAny.expect = chai.expect;
chai.should();
chai.use(chaiEnzyme());
chai.use(dirtyChai);
chai.use(sinonChai);

globalAny.JSHINT = () => true;
