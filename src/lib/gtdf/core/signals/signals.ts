import { ISingleton, Singleton } from "../decorator/singleton.js";
import { IObservable, IObserver } from "../observable/observer.js";
import { StaticImplements } from "../static/static.inteface.js";

/**
 * This interface represents a signal that can be emitted
 * @author akrck02
 */
export default interface ISignal extends IObservable {
  id: string;
  subscribers: IObserver[];

  /**
   * Subscribe an observer to the signal
   */
  emit: (data?: any) => Promise<void>;
}

/**
 * This class represents a signal that can be emitted
 * and observed by observers
 * @implements ISignal the signal interface
 * @implements ISingleton the singleton interface
 */
@Singleton()
@StaticImplements<ISingleton<Signal>>()
export class Signal implements ISignal {
  public static instance: Signal;
  public static instanceFn: () => Signal;

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
   * @inheritdoc
   */
  public subscribe(observer: IObserver) {
    this.subscribers.push(observer);
  }

  /**
   * @inheritdoc
   */
  public unsubscribe(observer: IObserver) {
    this.subscribers = this.subscribers.filter((obs) => obs !== observer);
  }

  /**
   * @inheritdoc
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
   * @inheritdoc
   */
  public async emit(data?: any) {
    this.content = data;
    await this.notify();
  }
}
