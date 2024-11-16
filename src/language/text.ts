import { Configuration } from "../configuration/configuration.js";
import { EasyFetch } from "../lib/gtdf/core/connection/easy.fetch.js";
import { ISingleton, Singleton } from "../lib/gtdf/core/decorator/singleton.js";
import { IObserver } from "../lib/gtdf/core/observable/observer.js";
import { Signal } from "../lib/gtdf/core/signals/signals.js";
import { StaticImplements } from "../lib/gtdf/core/static/static.inteface.js";
import Language, { ILanguage } from "../lib/gtdf/language/language.js";

@Singleton()
@StaticImplements<ISingleton<Text>>()
export class Text {
  private static readonly RELOAD_TEXT_SIGNAL = "reload_text";
  private static readonly RETRY_ATTEMPTS = 3;

  public static instance: Text;
  public static instanceFn: () => Text;

  public static reloadTextSignal = new Signal<Language>(
    Text.RELOAD_TEXT_SIGNAL,
  );

  private availableBundles: any;
  private currentLanguage: Language;

  private constructor() {
    this.availableBundles = {};
  }

  /**
   * get the category from the bundle
   * if the category does not exist,
   * it will try to fetch it 3 times
   * @param name The name of the category
   * @returns The category
   */
  public async getCategory(name: string) {
    let category = this.availableBundles[name];
    if (
      category !== undefined &&
      this.currentLanguage === Configuration.instance.getLanguage()
    )
      return category;

    const language = Configuration.instance.getLanguage();
    category = await this.fetchCategoryRetrying(
      name,
      language,
      Text.RETRY_ATTEMPTS,
    );
    if (category != undefined) this.currentLanguage = language;

    this.availableBundles[name] = category;
    return category;
  }

  /**
   * Fetch the category from the server
   */
  public async fetchCategoryRetrying(
    name: string,
    language: ILanguage,
    maxAttempts: number = 1,
  ) {
    let category = undefined;
    let currentAttempts = 0;
    while (undefined === category && currentAttempts < maxAttempts) {
      maxAttempts++;

      await EasyFetch.get({
        url: `${Configuration.instance.path.language}${language.main}/${name}.json`,
        parameters: {},
      })
        .status(200, (json) => (category = json))
        .json();
    }
    return category;
  }

  /**
   * Get the text from the category
   * @param category The category to get the text from
   * @param key The key of the text
   * @returns The text
   */
  public async get(category: string, key: string): Promise<string> {
    const categoryBundle = await this.getCategory(category);
    if (categoryBundle === undefined) return "";

    const text = categoryBundle[key];
    if (text === undefined) return "";

    return text;
  }
}
