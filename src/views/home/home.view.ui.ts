import Select from "../../components/select/select.component.js";
import { Configuration } from "../../configuration/configuration.js";
import { Text } from "../../language/text.js";
import { HomeBundle, TextCategory } from "../../language/text.register.js";
import { BubbleUI } from "../../lib/bubble/bubble.js";
import { Html } from "../../lib/gtdf/component/dom.js";
import { UIComponent } from "../../lib/gtdf/component/ui.component.js";
import { Route } from "../../lib/gtdf/core/decorator/route.js";
import { Singleton } from "../../lib/gtdf/core/decorator/singleton.js";
import Strings from "../../lib/gtdf/data/strings.js";
import Language from "../../lib/gtdf/language/language.js";
import { ViewUI } from "../../lib/gtdf/view/view.ui.js";
import HomeViewCore from "./home.view.core.js";

@Route(["home", "", undefined])
@Singleton()
export default class HomeView extends ViewUI {
  private static readonly ID = "home";
  private static readonly LOGO_ID = "logo";
  private static readonly DESCRIPTION_ID = "description";
  private static readonly START_MENU_ID = "start-menu";

  private static readonly INFO_BOX_CLASS = "info-box";
  private static readonly INFO_BOX_DESCRIPTION_CLASS = "description";
  private static readonly CLICKABLE_CLASS = "clickable";

  private static readonly LOGO_SVG = "logo.svg";
  private static readonly HELLO_WORLD_SVG = "hand.svg";
  private static readonly CONFIGURATIONS_SVG = "settings.svg";
  private static readonly CONTRIBUTE_SVG = "github.svg";

  public constructor() {
    super({
      type: Html.View,
      id: HomeView.ID,
      classes: [BubbleUI.BoxColumn, BubbleUI.BoxCenter],
    });
  }

  /**
   * Show the view
   * @param params The parameters of the view
   * @param container The container to append the view to
   */
  public async show(params: string[], container: UIComponent) {
    Configuration.instance.setTitle(
      `${Configuration.instance.base.app_name} - ${Text.instance.get(TextCategory.Home, HomeBundle.Title)}`,
    );

    const lang = Strings.toNormalCase(
      Language.getName(Configuration.instance.getLanguage()),
    );
    const select = new Select(
      HomeViewCore.getLanguages(),
      HomeViewCore.setLanguage,
      lang,
    );

    select.appendTo(this);

    const logo = new UIComponent({
      type: Html.Img,
      id: HomeView.LOGO_ID,
      attributes: {
        src: `${Configuration.instance.path.icons}${HomeView.LOGO_SVG}`,
        alt: await Text.instance.get(TextCategory.Home, HomeBundle.LogoAlt),
      },
    });

    const title = new UIComponent({
      type: Html.H1,
      text: `${await Text.instance.get(TextCategory.Home, HomeBundle.WelcomeMessage)}`,
    });

    const text = new UIComponent({
      type: Html.P,
      id: HomeView.DESCRIPTION_ID,
      text: `${await Text.instance.get(TextCategory.Home, HomeBundle.WelcomeDescription)}`,
    });

    const startMenu = await this.createStartMenu();
    logo.appendTo(this);
    title.appendTo(this);
    text.appendTo(this);
    startMenu.appendTo(this);
    this.appendTo(container);
  }

  /**
   * Create the start menu component
   * @returns The menu created.
   */
  private async createStartMenu(): Promise<UIComponent> {
    const menu = new UIComponent({
      type: Html.Div,
      id: HomeView.START_MENU_ID,
      classes: [BubbleUI.BoxColumn, BubbleUI.BoxCenter, BubbleUI.boxWrap],
    });

    const helpBox = this.createInfoBox(
      HomeView.HELLO_WORLD_SVG,
      await Text.instance.get(TextCategory.Home, HomeBundle.HelloWorld),
      await Text.instance.get(
        TextCategory.Home,
        HomeBundle.HelloWorldDescription,
      ),
      await Text.instance.get(TextCategory.Home, HomeBundle.HelloWorldIconAlt),
    );

    const configBox = this.createInfoBox(
      HomeView.CONFIGURATIONS_SVG,
      await Text.instance.get(TextCategory.Home, HomeBundle.Configurations),
      await Text.instance.get(
        TextCategory.Home,
        HomeBundle.ConfigurationsDescription,
      ),
      await Text.instance.get(
        TextCategory.Home,
        HomeBundle.ConfigurationsIconAlt,
      ),
    );

    const contributeBox = this.createInfoBox(
      HomeView.CONTRIBUTE_SVG,
      await Text.instance.get(TextCategory.Home, HomeBundle.Contribute),
      await Text.instance.get(
        TextCategory.Home,
        HomeBundle.ContributeDescription,
      ),
      await Text.instance.get(TextCategory.Home, HomeBundle.ContributeIconAlt),
      await Text.instance.get(TextCategory.Home, HomeBundle.ContributeUrl),
      true,
    );

    helpBox.appendTo(menu);
    configBox.appendTo(menu);
    contributeBox.appendTo(menu);

    return menu;
  }

  /**
   * Create an info box component
   * @param image the image to display
   * @param title the title of the box
   * @param message the message of the box
   * @param alt  the alt of the image
   * @param url the url to redirect (optional)
   * @param newPage if the url should be opened in a new page
   * @returns The info box created.
   */
  public createInfoBox(
    image: string,
    title: string,
    message: string,
    alt: string,
    url: string = undefined,
    newPage: boolean = false,
  ): UIComponent {
    const infoBox = new UIComponent({
      classes: [
        HomeView.INFO_BOX_CLASS,
        BubbleUI.BoxColumn,
        BubbleUI.BoxCenter,
        BubbleUI.TextCenter,
      ],
    });

    const infoBoxIcon = new UIComponent({
      type: Html.Img,
      attributes: {
        src: Configuration.instance.path.icons + image,
        alt: `${alt}`,
      },
    });

    infoBoxIcon.appendTo(infoBox);

    const infoBoxTitle = new UIComponent({
      type: Html.H2,
      text: title,
    });

    infoBoxTitle.appendTo(infoBox);

    const infoBoxDescription = new UIComponent({
      type: Html.P,
      text: message,
      classes: [HomeView.INFO_BOX_DESCRIPTION_CLASS],
    });
    infoBoxDescription.appendTo(infoBox);

    // if url is defined set action listener
    if (url == undefined) return infoBox;

    // Set "clickable" style and behaviour
    infoBox.setClasses([HomeView.CLICKABLE_CLASS]);

    // Setting event
    infoBox.setEvents({
      click: (e: Event) => {
        e.preventDefault();
        e.stopPropagation();

        window.open(url, newPage ? "blank" : "");
      },
    });

    return infoBox;
  }
}
