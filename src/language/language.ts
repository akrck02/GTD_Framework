/**
 * This interface represents a lenguage
 * @author akrck02
 */
export interface ILanguage {
  name: string;
  main: string;
  locales: string[];
}

/**
 * Languages that can be used in the application
 * @author akrck02
 */
const Languages = {
  English: { name: "english", main: "en", locales: ["en", "en-US", "en-GB"] },
  Spanish: { name: "spanish", main: "es", locales: ["es", "es-ES"] },
  French: { name: "french", main: "fr", locales: ["fr", "fr-FR"] },
  German: { name: "german", main: "de", locales: ["de", "de-DE"] },
  Italian: { name: "italian", main: "it", locales: ["it", "it-IT"] },
  Portuguese: { name: "portuguese", main: "pt", locales: ["pt", "pt-PT"] },
  Russian: { name: "russian", main: "ru", locales: ["ru", "ru-RU"] },
  Chinese: { name: "chinese", main: "zh", locales: ["zh", "zh-CN"] },
  Japanese: { name: "japanese", main: "ja", locales: ["ja", "ja-JP"] },
  Korean: { name: "korean", main: "ko", locales: ["ko", "ko-KR"] },
  Arabic: { name: "arabic", main: "ar", locales: ["ar", "ar-SA"] },
  Hindi: { name: "hindi", main: "hi", locales: ["hi", "hi-IN"] },
  Turkish: { name: "turkish", main: "tr", locales: ["tr", "tr-TR"] },
  Dutch: { name: "dutch", main: "nl", locales: ["nl", "nl-NL"] },
  Polish: { name: "polish", main: "pl", locales: ["pl", "pl-PL"] },
  Swedish: { name: "swedish", main: "sv", locales: ["sv", "sv-SE"] },
  Danish: { name: "danish", main: "da", locales: ["da", "da-DK"] },
  Norwegian: { name: "norwegian", main: "no", locales: ["no", "no-NO"] },
  Finnish: { name: "finnish", main: "fi", locales: ["fi", "fi-FI"] },
  Greek: { name: "greek", main: "el", locales: ["el", "el-GR"] },
  Czech: { name: "czech", main: "cs", locales: ["cs", "cs-CZ"] },
  Hungarian: { name: "hungarian", main: "hu", locales: ["hu", "hu-HU"] },
  Romanian: { name: "romanian", main: "ro", locales: ["ro", "ro-RO"] },
  Slovak: { name: "slovak", main: "sk", locales: ["sk", "sk-SK"] },
  Bulgarian: { name: "bulgarian", main: "bg", locales: ["bg", "bg-BG"] },
  Croatian: { name: "croatian", main: "hr", locales: ["hr", "hr-HR"] },
  Lithuanian: { name: "lithuanian", main: "lt", locales: ["lt", "lt-LT"] },
  Latvian: { name: "latvian", main: "lv", locales: ["lv", "lv-LV"] },
  Estonian: { name: "estonian", main: "et", locales: ["et", "et-EE"] },
  Slovenian: { name: "slovenian", main: "sl", locales: ["sl", "sl-SI"] },
  Serbian: { name: "serbian", main: "sr", locales: ["sr", "sr-RS"] },
  Ukrainian: { name: "ukrainian", main: "uk", locales: ["uk", "uk-UA"] },
  Hebrew: { name: "hebrew", main: "he", locales: ["he", "he-IL"] },
  Thai: { name: "thai", main: "th", locales: ["th", "th-TH"] },
  Vietnamese: { name: "vietnamese", main: "vi", locales: ["vi", "vi-VN"] },
  Indonesian: { name: "indonesian", main: "id", locales: ["id", "id-ID"] },
  Malay: { name: "malay", main: "ms", locales: ["ms", "ms-MY"] },
  Filipino: { name: "filipino", main: "fil", locales: ["fil", "fil-PH"] },
  Swahili: { name: "swahili", main: "sw", locales: ["sw", "sw-KE"] },
  Afrikaans: { name: "afrikaans", main: "af", locales: ["af", "af-ZA"] },
  Amharic: { name: "amharic", main: "am", locales: ["am", "am-ET"] },
  Armenian: { name: "armenian", main: "hy", locales: ["hy", "hy-AM"] },
  Azerbaijani: { name: "azerbaijani", main: "az", locales: ["az", "az-AZ"] },
  Belarusian: { name: "belarusian", main: "be", locales: ["be", "be-BY"] },
  Bengali: { name: "bengali", main: "bn", locales: ["bn", "bn-BD"] },
  Bosnian: { name: "bosnian", main: "bs", locales: ["bs", "bs-BA"] },
  Galician: { name: "galician", locales: ["gl", "gl-ES"] },

  // Add more languages here
};

/**
 * This class is used to get the language from the locale
 * @author akrck02
 */
export default class Language {
  /**
   * Available languages for the app
   */
  public static readonly available: ILanguage[] = [
    Languages.English,
    Languages.Spanish,
  ];

  /**
   * Default language for the app
   */
  public static readonly DEFAULT = Languages.English;

  /**
   * Get the language from the locale
   * @param locale The locale
   * @returns The language
   */
  public static get(locale: string): ILanguage {
    if (locale === undefined) return Language.DEFAULT;
    const found = Language.available.find((lang) =>
      lang.locales.includes(locale),
    );

    if (found === undefined) return Language.DEFAULT;

    return found;
  }
}
