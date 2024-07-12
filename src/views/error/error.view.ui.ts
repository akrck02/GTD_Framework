import { Configuration } from "../../configuration/configuration";
import { Errors } from "../../configuration/error";
import { HTML } from "../../lib/gtdf/component/dom";
import { UIComponent } from "../../lib/gtdf/component/ui.component";
import { Route } from "../../lib/gtdf/core/decorator/route";
import { Singleton } from "../../lib/gtdf/core/decorator/singleton";
import { ViewUI } from "../../lib/gtdf/view/view.ui";

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
      type: HTML.IMG,
      id: ErrorView.IMAGE_ID,
      attributes: {
        src: Configuration.instance().Path.icons + "error.svg",
      },
    });
    this.appendChild(image);

    // Error title
    const title = new UIComponent({
      type: HTML.H1,
      id: ErrorView.TITLE_ID,
      text: error.friendly,
    });

    this.appendChild(title);

    // Error description
    const description = new UIComponent({
      type: HTML.P,
      text: error.description,
    });

    this.appendChild(description);
    this.appendTo(container);
  }
}
