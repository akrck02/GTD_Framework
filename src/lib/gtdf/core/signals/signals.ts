type SignalAction<T> = (data: T) => Promise<T>;

/**
 * This interface represents a signal that can be emitted
 * @author akrck02
 */
export default interface ISignal<T> {
  id: string;
  sync: boolean;
  actions: { [key: string]: SignalAction<T> };

  /**
   * emit the signal with data
   */
  emit: (data: T) => Promise<void>;
}

/**
 * This class represents a signal that can be emitted
 * and listen by functions
 */
export class Signal<T> implements ISignal<T> {
  id: string;
  sync: boolean;
  actions: { [key: string]: SignalAction<T> };

  public constructor(id: string, sync = false) {
    this.id = id;
    this.sync = sync;
    this.actions = {};
  }

  /**
   * Connect a function to a signal
   * @param action the function to disconnect
   */
  public connect(action: SignalAction<T>): void {
    this.actions[action.name] = action;
  }

  /**
   * Disconnect a function from a signal
   * @param action The function to disconnect
   */
  public disconnect(action: SignalAction<T>) {
    this.actions[action.name] = undefined;
  }

  /**
   * Emit the signal and call the connected actions
   * the function will wait for each action to finish
   * if sync is enabled.
   */
  public async emit(data: T) {
    for (let name in Object.keys(this.actions)) {
      const action = this.actions[name];
      if (this.sync) await action.call(data);
      else action.call(data);
    }
  }
}
