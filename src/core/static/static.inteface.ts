/**
 * This decorator is used to mark a class as implementing an interface
 * as static classes cannot implement interfaces
 */
export function StaticImplements<T>() {
  return <U extends T>(constructor: U) => {
    constructor;
  };
}
