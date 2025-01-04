import { IObservable, IObserver } from "./observer.js";
import { UIComponent, UIProperties } from "../../component/ui.component.js";

/**
 * This interface represents the properties of an observer UI component
 * @extends UIProperties the properties of a UI component
 */
export interface ObserverUIProperties extends UIProperties {
  observable: IObservable;
}

/**
 * This class represents an UI component that observes an observable object
 * and updates when the observable object changes
 * @extends UIComponent the UI component class
 * @implements IObserver the observer interface
 */
export class ObservableUIComponent extends UIComponent implements IObserver {
  protected observable: IObservable;

  /**
   * @inheritdoc
   */
  public constructor(properties: ObserverUIProperties) {
    super(properties);
    this.observable = properties.observable;
    this.observable.subscribe(this);
  }

  /**
   * The update method of the observer UI component
   * MUST be implemented by the child
   */
  async update() {
    console.warn("ObservableUIComponent.update() not implemented.");
  }
}
