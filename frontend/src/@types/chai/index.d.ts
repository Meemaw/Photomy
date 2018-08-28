declare namespace Chai {
  /* tslint:disable-next-line:interface-name */
  export interface LanguageChains {
    always: Assertion;
  }

  /* tslint:disable-next-line:interface-name */
  export interface Assertion {
    /**
     * @note
     *   This is required because you cannot redeclare the type of previously-declared property on an interface.
     *   The correct types are included for the existing Chai assertion properties we are overwriting, for the
     *   sake of completeness, but they are ignored by the TypeScript compiler.
     * @see {@link https://stackoverflow.com/a/41286276}
     */
    (message?: string): Assertion;

    // From: sinon-chai
    called(message?: string): Assertion;
    calledOnce(message?: string): Assertion;
    calledTwice(message?: string): Assertion;
    calledThrice(message?: string): Assertion;
    calledWithNew(message?: string): Assertion;

    callCount(count: number): Assertion;
    calledBefore(anotherSpy: any): Assertion;
    calledAfter(anotherSpy: any): Assertion;
    calledOn(context: any): Assertion;
    calledWith(...args: any[]): Assertion;
    calledWithExactly(...args: any[]): Assertion;
    calledWithMatch(...args: any[]): Assertion;
    returned(obj: any): Assertion;
    thrown(obj?: Error | typeof Error | string): Assertion;
  }
}

declare module 'dirty-chai' {
  function dirtyChai(chai: any, utils: any): void;
  namespace dirtyChai {

  }
  export = dirtyChai;
}

declare module 'sinon-chai' {
  function sinonChai(chai: any, utils: any): void;
  namespace sinonChai {

  }
  export = sinonChai;
}
