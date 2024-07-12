var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var HomeView_1;
import Select from "../../components/select/select.component.js";
import { Configuration } from "../../configuration/configuration.js";
import { Text } from "../../language/text.js";
import { HTML } from "../../lib/gtdf/component/dom.js";
import { UIComponent } from "../../lib/gtdf/component/ui.component.js";
import { Route } from "../../lib/gtdf/core/decorator/route.js";
import { Singleton } from "../../lib/gtdf/core/decorator/singleton.js";
import Strings from "../../lib/gtdf/data/strings.js";
import Language from "../../lib/gtdf/language/language.js";
import { ViewUI } from "../../lib/gtdf/view/view.ui.js";
import HomeViewCore from "./home.view.core.js";
let HomeView = HomeView_1 = class HomeView extends ViewUI {
    constructor() {
        super({
            type: "view",
            id: HomeView_1.ID,
            classes: ["box-column", "box-center"],
        });
    }
    async show(params, container) {
        Configuration.instance().setTitle(`${Configuration.instance().Base.app_name} - ${Text.home.TITLE}`);
        const lang = Strings.toNormalCase(Language.getName(Configuration.instance().getLanguage()));
        const select = new Select(HomeViewCore.getLanguages(), HomeViewCore.setLanguage, lang);
        select.setStyles({
            position: "absolute",
            right: "2rem",
            top: "1rem",
        });
        select.appendTo(this);
        const logo = new UIComponent({
            type: HTML.IMG,
            id: HomeView_1.LOGO_ID,
            attributes: {
                src: `${Configuration.instance().Path.icons}${HomeView_1.LOGO_SVG}`,
                alt: Text.home.LOGO_ALT,
            },
        });
        const title = new UIComponent({
            type: HTML.H1,
            text: `💭 ${Text.home.WELCOME_MESSAGE} 😉`,
        });
        const text = new UIComponent({
            type: HTML.P,
            id: HomeView_1.DESCRIPTION_ID,
            text: `💻&nbsp; ${Text.home.WELCOME_DESCRIPTION} &nbsp;🚀`,
        });
        const startMenu = this.createStartMenu();
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
    createStartMenu() {
        const menu = new UIComponent({
            type: HTML.DIV,
            id: HomeView_1.START_MENU_ID,
            classes: ["box-row", "box-center", "box-warp"],
        });
        const helpBox = this.createInfoBox(HomeView_1.HELLO_WORLD_SVG, Text.home.HELLO_WORLD, Text.home.HELLO_WORLD_DESCRIPTION, Text.home.HELLO_WORLD_ICON_ALT);
        const configBox = this.createInfoBox(HomeView_1.CONFIGURATIONS_SVG, Text.home.CONFIGURATIONS, Text.home.CONFIGURATIONS_DESCRIPTION, Text.home.CONFIGURATIONS_ICON_ALT);
        const contributeBox = this.createInfoBox(HomeView_1.CONTRIBUTE_SVG, Text.home.CONTRIBUTE, Text.home.CONTRIBUTE_DECRIPTION, Text.home.CONTRIBUTE_ICON_ALT, HomeViewCore.CONTRIBUTE_URL, true);
        helpBox.appendTo(menu);
        configBox.appendTo(menu);
        contributeBox.appendTo(menu);
        return menu;
    }
    createInfoBox(image, title, message, alt, url = undefined, newPage = false) {
        const infoBox = new UIComponent({
            classes: [
                HomeView_1.INFO_BOX_CLASS,
                "box-column",
                "box-center",
                "text-center",
            ],
        });
        const infoBoxIcon = new UIComponent({
            type: HTML.IMG,
            attributes: {
                src: Configuration.instance().Path.icons + image,
                alt: `${alt}`,
            },
        });
        infoBoxIcon.appendTo(infoBox);
        const infoBoxTitle = new UIComponent({
            type: HTML.H2,
            text: title,
        });
        infoBoxTitle.appendTo(infoBox);
        const infoBoxDescription = new UIComponent({
            type: HTML.P,
            text: message,
            classes: ["description"],
        });
        infoBoxDescription.appendTo(infoBox);
        // if url is defined set action listener
        if (url) {
            // Set "clickable" style and behaviour
            infoBox.setClasses(["clickable"]);
            // Setting event
            infoBox.setEvents({
                click: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(url, newPage ? "blank" : "");
                },
            });
        }
        return infoBox;
    }
};
HomeView.ID = "home";
HomeView.LOGO_ID = "logo";
HomeView.DESCRIPTION_ID = "description";
HomeView.START_MENU_ID = "start-menu";
HomeView.INFO_BOX_CLASS = "info-box";
HomeView.LOGO_SVG = "logo.svg";
HomeView.HELLO_WORLD_SVG = "hand.svg";
HomeView.CONFIGURATIONS_SVG = "settings.svg";
HomeView.CONTRIBUTE_SVG = "github.svg";
HomeView = HomeView_1 = __decorate([
    Route(["home", "", undefined]),
    Singleton(),
    __metadata("design:paramtypes", [])
], HomeView);
export default HomeView;
