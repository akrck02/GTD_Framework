import { Signal } from "../lib/gtdf/core/signals/signals.js";

/**
 * Buffer of global signals
 */
export class SignalBuffer {
  public static _instance: any;
  public static instance(): any {
    return this._instance;
  }

  private static signals: { [key: string]: Signal } = {};

  public static add(signal: Signal) {
    this.signals[signal.id] = signal;
  }

  public static remove(signal: Signal) {
    this.signals[signal.id] = undefined;
  }

  public static search(id: string): Signal {
    return this.signals[id];
  }
}
