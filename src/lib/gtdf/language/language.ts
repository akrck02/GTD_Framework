/**
 * Available languages for the app
 * @author akrck02
 */
export enum AvailableLanguage {
  English = "en",
}

/**
 * This class is used to get the language from the locale
 * @author akrck02
 */
export default class Language {
  public static readonly DEFAULT = AvailableLanguage.English;

  /**
   * Get the language from the locale
   * @param locale The locale
   * @returns The language
   */
  public static get(locale: string): AvailableLanguage {
    if (locale === undefined) return Language.DEFAULT;
    const found = Object.keys(AvailableLanguage).find((key) =>
      locale.includes(AvailableLanguage[key]),
    );

    if (found === undefined) return Language.DEFAULT;

    return AvailableLanguage[found];
  }
}
