import { SignalBuffer } from "../core/signal.buffer.js";
import InitializeError from "../error/initialize.error.js";
import { Html } from "../lib/gtdf/component/dom.js";
import { UIComponent } from "../lib/gtdf/component/ui.component.js";
import { Routes } from "../lib/gtdf/core/decorator/route.js";
import { ISingleton, Singleton } from "../lib/gtdf/core/decorator/singleton.js";
import { IObserver } from "../lib/gtdf/core/observable/observer.js";
import { Signal } from "../lib/gtdf/core/signals/signals.js";
import { StaticImplements } from "../lib/gtdf/core/static/static.inteface.js";
import { ViewUI } from "../lib/gtdf/view/view.ui.js";
import ErrorView from "./error/error.view.ui.js";
import HomeView from "./home/home.view.ui.js";

@Singleton()
@StaticImplements<ISingleton<Router>>()
export default class Router implements IObserver {
  private static readonly VIEW_CONTAINER_ID = "view-container";
  private static readonly VIEW_CONTAINER_BOX_ID = "view-container-box";

  private static readonly VIEW_CHANGE_REQUESTED_SIGNAL = "viewChangeRequested";
  private static readonly VIEW_RELOAD_SIGNAL = "viewReload";

  public static instance: Router;
  public static instanceFn: () => Router;

  private parent: HTMLElement;
  private container: UIComponent;
  private currentView: ViewUI;
  private currentParams: string[];

  private changeViewRequestedSignal: Signal<void>;
  private reloadCurrentViewSignal: Signal<void>;

  private constructor() {
    this.parent = document.getElementById("view-container") as HTMLElement;

    //If no parent is present on the HTML file throws an error
    if (!this.parent)
      throw new InitializeError("view-container does not exist");

    this.container = new UIComponent({
      type: Html.Div,
      id: Router.VIEW_CONTAINER_BOX_ID,
      styles: {
        width: "100%",
        height: "100%",
      },
    });

    this.suscribeToSignals();
    this.container.appendTo(this.parent);
  }

  /**
   * Suscribe to the signals
   */
  private suscribeToSignals() {
    this.changeViewRequestedSignal = new Signal(
      Router.VIEW_CHANGE_REQUESTED_SIGNAL,
    );
    this.changeViewRequestedSignal.connect({
      origin: "Router",
      action: async () => console.log("a"),
    });

    this.reloadCurrentViewSignal = new Signal(Router.VIEW_RELOAD_SIGNAL);
    this.reloadCurrentViewSignal.connect({
      origin: "Router",
      action: async () => this.reloadCurrentView(),
    });
  }

  /**
   * @inheritdoc
   */
  async update(data?: any): Promise<void> {
    console.debug(data);
    console.debug(`Router update to /${data.view}`);

    let params = [];
    if (data.params) {
      params.push(data.view);
      params = params.concat(data.params);
    }

    await this.load(params);
  }

  Endpoints = [HomeView, ErrorView];

  /**
   * Load the app state with the given params
   * @param params The list of params
   */
  public async load(params: string[]) {
    try {
      this.container.clean();
      this.clear();

      // load the ViewUI instances created with the @Route decorator
      for (const route of Routes)
        if (await this.navigate(route, params)) return;

      ErrorView.instance.show(["404"], this.container);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Navigate to the given view
   */
  public async navigate(view: ViewUI, params: string[] = []): Promise<boolean> {
    if (!view.isPointing(params[0])) return false;

    this.currentView = view;
    this.currentParams = params;
    view.clean();
    await view.show(params.splice(1), this.container);
    return true;
  }

  /**
   * Reload the current view
   */
  public async reloadCurrentView() {
    await this.currentView.show(this.currentParams, this.container);
  }

  /**
   * Clear the container
   */
  public clear() {
    this.container.element.innerHTML = "";
  }
}
