export interface IObserver {
  update(data?: any): Promise<void>;
}

export interface IObservable {
  sync: boolean;
  content: any;
  subscribe(observer: IObserver): void;
  unsubscribe(observer: IObserver): void;
  notify(): Promise<void>;
}

export class Observable implements IObservable {
  private observers: IObserver[] = [];
  public content: any;
  public sync: boolean;

  constructor(sync: boolean = false) {
    this.sync = sync;
    let a = this;
    this.content = {};
    this.content = new Proxy(this.content, {
      set: function (target, key, value) {
        target[key] = value;
        a.notify();
        return true;
      },
    });
  }

  /**
   * Subscribe an observer to the observable
   * @param observer The observer to subscribe
   */
  public async subscribe(observer: IObserver) {
    this.observers.push(observer);
  }

  /**
   * Unsubscribe an observer from the observable
   * @param observer The observer to unsubscribe
   */
  public async unsubscribe(observer: IObserver) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  /**
   * Notify all observers of the
   */
  public async notify() {
    for (let observer of this.observers) {
      try {
        if (this.sync) await observer.update();
        else observer.update();
      } catch (e) {
        console.error("Error notifying observer", e);
      }
    }
  }
}
