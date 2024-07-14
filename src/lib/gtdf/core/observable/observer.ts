/**
 * This interface represents an object that
 * observes an observable object
 * @author akrck02
 */
export interface IObserver {
  update(data?: any): Promise<void>;
}

/**
 * This interface represents an object that
 * can be observed by an observer
 * @author akrck02
 */
export interface IObservable {
  /**
   * If the observable is sync or async when notifying observers
   */
  sync: boolean;

  /**
   * The content of the observable
   */
  content: any;

  /**
   * Subscribe an observer to the observable
   * @param observer The observer to subscribe
   */
  subscribe(observer: IObserver): void;

  /**
   * Unsubscribe an observer from the observable
   * @param observer The observer to unsubscribe
   */
  unsubscribe(observer: IObserver): void;

  /**
   * Notify all observers of the observable
   * @returns a promise that resolves when all
   * observers are notified if the observable is sync
   * or when the notification is queued if the observable is async
   */
  notify(): Promise<void>;
}

/**
 * This class represents an observable object
 * that can be observed by an observer
 * and notify the observer when the content changes
 * @implements IObservable the observable interface
 * @author akrck02
 */
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
   * @inheritdoc
   */
  public async subscribe(observer: IObserver) {
    this.observers.push(observer);
  }

  /**
   * @inheritdoc
   */
  public async unsubscribe(observer: IObserver) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  /**
   * @inheritdoc
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
