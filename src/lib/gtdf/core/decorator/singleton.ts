/**
 * Singleton interface
 */
export interface ISingleton<T> {
  instance: T;
  instanceFn: () => T;
}

/**
 * Singleton decorator to make a class a singleton
 *
 */
export function Singleton<T extends ISingleton<T>>() {
  return function (target: any) {
    console.debug(`Singleton instanciated: ${target.name}`);
    target.instanceFn = () => {
      if (!target.instance) target.instance = new target();
      return target.instance;
    };

    target.instanceFn();
  };
}
