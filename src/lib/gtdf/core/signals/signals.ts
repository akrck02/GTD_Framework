import { ISingleton, Singleton } from "../decorator/singleton.js";
import { IObservable, IObserver } from "../observable/observer.js";
import { StaticImplements } from "../static/static.inteface.js";

export default interface ISignal extends IObservable {
  id: string;
  subscribers: IObserver[];
  emit: (data?: any) => Promise<void>;
}

@Singleton()
@StaticImplements<ISingleton<Signal>>()
export class Signal implements ISignal {
  public static _instance: any;
  public static instance(): any {
    return this._instance;
  }

  id: string;
  sync: boolean;
  subscribers: IObserver[];
  content: any;

  public constructor(id: string, sync = false) {
    this.id = id;
    this.sync = sync;
    this.subscribers = [];
    this.content = {};
  }

  /**
   * Subscribe an observer to the signal
   */
  public subscribe(observer: IObserver) {
    this.subscribers.push(observer);
  }

  /**
   * Unsubscribe an observer from the signal
   */
  public unsubscribe(observer: IObserver) {
    this.subscribers = this.subscribers.filter((obs) => obs !== observer);
  }

  /**
   * notify the current state to all subscribers
   */
  async notify() {
    for (let observer of this.subscribers) {
      try {
        if (this.sync) await observer.update(this.content);
        else observer.update(this.content);
      } catch (e) {
        console.error(`Error notifying observer on signal ${this.id}`, e);
      }
    }
  }

  /**
   * emit the signal with given data
   */
  public async emit(data?: any) {
    this.content = data;
    await this.notify();
  }
}
