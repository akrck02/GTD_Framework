import { Configuration } from "../../configuration/configuration.js";
import { Errors } from "../../configuration/error.js";
import { Html } from "../../lib/gtdf/component/dom.js";
import { UIComponent } from "../../lib/gtdf/component/ui.component.js";
import { Route } from "../../lib/gtdf/core/decorator/route.js";
import { Singleton } from "../../lib/gtdf/core/decorator/singleton.js";
import { ViewUI } from "../../lib/gtdf/view/view.ui.js";

@Route("error")
@Singleton()
export default class ErrorView extends ViewUI {
  private static readonly DEFAULT_ERROR_CODE = 404;
  private static readonly ID = "error";
  private static readonly IMAGE_ID = "error-img";
  private static readonly TITLE_ID = "error-title";

  public constructor() {
    super({
      type: "view",
      id: ErrorView.ID,
      classes: ["box-column", "box-center"],
    });
  }

  public async show(params: string[], container: UIComponent) {
    this.clean();
    const code = parseInt(params[0]);
    let error = Errors.getByCode(code);

    // Default error set if no error parameter was given
    if (!error) {
      error = Errors.getByCode(ErrorView.DEFAULT_ERROR_CODE);
    }

    // Image
    const image = new UIComponent({
      type: Html.Img,
      id: ErrorView.IMAGE_ID,
      attributes: {
        src: Configuration.instance.path.icons + "error.svg",
      },
    });
    this.appendChild(image);

    // Error title
    const title = new UIComponent({
      type: Html.H1,
      id: ErrorView.TITLE_ID,
      text: error.friendly,
    });

    this.appendChild(title);

    // Error description
    const description = new UIComponent({
      type: Html.P,
      text: error.description,
    });

    this.appendChild(description);
    this.appendTo(container);
  }
}
