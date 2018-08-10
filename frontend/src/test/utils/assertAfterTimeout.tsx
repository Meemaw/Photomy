const assertAfterTimeout = (assertion: any, done: any, timeout: number = 1000) => {
  setTimeout(() => {
    try {
      assertion();
      done();
    } catch (err) {
      done.fail();
    }
  }, timeout);
};

export default assertAfterTimeout;
