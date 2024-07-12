import { UIComponent } from "../component/ui.component.js";
import { StaticImplements } from "../core/static/static.inteface.js";
import { ISingleton } from "../core/decorator/singleton.js";

@StaticImplements<ISingleton<any>>()
export abstract class ViewUI extends UIComponent {
  public static _instance: any;
  public static instance(): any {
    return this._instance;
  }

  public abstract show(params: string[], container: UIComponent): Promise<void>;
  public routes: string[] = [];

  protected constructor(details: any) {
    super(details);
  }

  public isPointing(name: string) {
    return this.routes.includes(name);
  }
}
