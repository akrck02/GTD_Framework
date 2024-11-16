import { Configuration } from "../../configuration/configuration.js";
import Utils from "../../core/utils.js";
import { Text } from "../../language/text.js";
import { StringMap } from "../../lib/gtdf/data/strings.js";
import { ViewCore } from "../../lib/gtdf/view/view.core.js";
import LanguageService from "../../services/language.service.js";
import HomeView from "./home.view.ui.js";

/**
 * This class represents the core of the home view
 * it handles the logic of the home view, calculations, etc.
 */
export default class HomeViewCore extends ViewCore {
  public static CONTRIBUTE_URL = "https://github.com/akrck02/GTD-Framework";

  /**
   * Get available languages to add to the select
   * @returns The available languages
   */
  public static getLanguages(): StringMap {
    return LanguageService.getLanguages();
  }

  /**
   * Set the app language and reload
   * @param selected The selected language
   */
  public static async setLanguage(selected: string) {
    Configuration.instance.setLanguage(selected);
    await Text.reloadTextSignal.emit(Configuration.instance.getLanguage());
    // Utils.redirect(Configuration.instance.views.home, [], true);
  }
}
