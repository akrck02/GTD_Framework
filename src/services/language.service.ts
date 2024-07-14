import { Configuration } from "../configuration/configuration.js";
import { StringMap } from "../lib/gtdf/data/strings.js";
import { AvailableLanguage } from "../lib/gtdf/language/language.js";

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
    Object.keys(AvailableLanguage).forEach((lang) =>
      LanguageService.addFormattedLanguage(lang, formatted),
    );
    console.log(formatted);
    return formatted;
  }

  /**
   * Adds a formatted language to the map
   * key is the formatted language
   * value is the language enum value
   * @param lang The language to add
   * @param map The map to add the language to
   */
  private static addFormattedLanguage(lang: string, map: StringMap) {
    map[lang] = AvailableLanguage[lang];
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
   * Get available languages to add to the select
   * @returns The available languages with names
   */
  public static getAvailableLanguagesWithNames(): StringMap {
    return AvailableLanguage;
  }

  /**
   * Set the app language and reload
   * @param selected The selected language
   */
  public static setLanguage(selected: string) {
    Configuration.instance.setLanguage(selected);
  }
}
