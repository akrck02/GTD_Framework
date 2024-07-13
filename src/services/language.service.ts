import { Configuration } from "../configuration/configuration.js";
import { StringMap } from "../lib/gtdf/data/strings.js";
import { Languages } from "../lib/gtdf/language/language.js";

export default class LanguageService {
  /**
   * Get available languages to add to the select
   * @returns The available languages
   */
  public static getLanguages(): StringMap {
    const formatted = {};

    const list = Object.keys(Languages);
    list.forEach((lang) => {
      formatted[
        lang.toUpperCase().substring(0, 1) + lang.toLowerCase().substring(1)
      ] = Languages[lang];
    });

    return formatted;
  }

  /**
   * Get available languages to add to the select
   * @returns The available languages with names
   */
  public static getAvailableLanguagesWithNames(): StringMap {
    return Languages;
  }

  /**
   * Set the app language and reload
   * @param selected The selected language
   */
  public static setLanguage(selected: string) {
    Configuration.instance().setLanguage(selected);
  }
}
