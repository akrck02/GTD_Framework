import { UIComponent, UIProperties } from "../component/ui.component.js";
import { StaticImplements } from "../core/static/static.inteface.js";
import { ISingleton } from "../core/decorator/singleton.js";

/**
 * This class is the base class for all views
 * containing the basic functionality for a view
 * @implements ISingleton the singleton interface
 * that assure that only one instance of this class is created
 * @author akrck02
 */
@StaticImplements<ISingleton<ViewUI>>()
export abstract class ViewUI extends UIComponent {
  public static instance: ViewUI;
  public static instanceFn: () => ViewUI;
  public routes: string[] = [];

  /**
   * The constructor of the view
   * @param details The details of the view,
   * same as the UIComponent constructor
   */
  protected constructor(details: UIProperties) {
    super(details);
  }

  /**
   * Base method to show the view with the given parameters
   * @param params The parameters to show the view
   * @param container The container to show the view on
   * @returns a promise that resolves when the view is shown
   */
  public abstract show(params: string[], container: UIComponent): Promise<void>;

  /**
   * Check if the view is pointing to the given path
   * @param name The name to check
   * @returns if the view is pointing to the given path
   */
  public isPointing(path: string): boolean {
    return this.routes.includes(path);
  }
}
