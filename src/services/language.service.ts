import { Configuration } from "../configuration/configuration.js";
import { StringMap } from "../lib/gtdf/data/strings.js";
import Language, { ILanguage } from "../lib/gtdf/language/language.js";

/**
 * This class represents the language service
 * it handles language related operations
 * @author akrck02
 */
export default class LanguageService {
  /**
   * Get available languages to add to the select
   * @returns The available languages
   */
  public static getLanguages(): StringMap {
    const formatted = {};
    Language.available.forEach((lang: ILanguage) => {
      formatted[lang.name] = lang.main;
    });
    return formatted;
  }

  /**
   * Format the language with mayus first letter
   * @param lang The language
   * @returns The formatted language
   */
  private static formatLanguageFirstMayus(lang: string): string {
    return lang.toUpperCase().substring(0, 1) + lang.toLowerCase().substring(1);
  }

  /**
   * Set the app language and reload
   * @param selected The selected language
   */
  public static setLanguage(selected: string) {
    Configuration.instance.setLanguage(selected);
  }
}
