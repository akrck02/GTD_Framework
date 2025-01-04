import Crypto from "../crypto/crypto.js";

/**
 * This interface represents a signal that can be emitted
 * @author akrck02
 */
type SignalAction<T> = {
  origin: string;
  action: (data: T) => Promise<void>;
};

/**
 * This interface represents a signal that can be emitted
 * @author akrck02
 */
export default interface ISignal<T> {
  id: string;
  actions: { [key: string]: SignalAction<T> };

  /**
   * Connect a function to a signal
   * @param action the function to disconnect
   */
  connect(action: SignalAction<T>): Promise<void>;

  /**
   * Disconnect a function from a signal
   * @param action The function to disconnect
   */
  disconnect(action: SignalAction<T>): Promise<void>;

  /**
   * Emit the signal and call the connected actions
   * the function will wait for each action to finish
   * if sync is enabled.
   */
  emit: (data: T) => Promise<void>;
}

/**
 * This class represents a signal that can be emitted
 * and listen by functions
 * @author akrck02
 */
export class Signal<T> implements ISignal<T> {
  id: string;
  actions: { [key: string]: SignalAction<T> };

  /**
   * Create a new signal
   * @param id The id of the signal
   */
  public constructor(id: string) {
    this.id = id;
    this.actions = {};
  }

  /**
   * @inheritdoc
   */
  public async connect(action: SignalAction<T>) {
    const prototypeString = action.action.toString();
    this.actions[await this.hashAction(action)] = action;
  }

  /**
   * @inheritdoc
   */
  public async disconnect(action: SignalAction<T>) {
    this.actions[await this.hashAction(action)] = undefined;
  }

  /**
   * @inheritdoc
   */
  public async emit(data: T) {
    for (const name in this.actions) {
      await this.actions[name].action.call(data);
    }
  }

  /**
   * Hash the body of the action using sha256
   */
  private async hashAction(action: SignalAction<T>): Promise<string> {
    const prototypeString = action.toString();
    const hashedBody = await Crypto.sha256(prototypeString);
    const hashedOrigin = await Crypto.sha256(action.origin);

    return `${hashedOrigin}-${hashedBody}`;
  }
}
