import { Configuration } from "../configuration/configuration.js";
import { ISingleton, Singleton } from "../lib/gtdf/core/decorator/singleton.js";
import { IObserver } from "../lib/gtdf/core/observable/observer.js";
import { Signal } from "../lib/gtdf/core/signals/signals.js";
import { StaticImplements } from "../lib/gtdf/core/static/static.inteface.js";

@Singleton()
@StaticImplements<ISingleton<Text>>()
export class Text implements IObserver {
  private static readonly RELOAD_TEXT_SIGNAL = "reload_text";
  private static readonly RETRY_ATTEMPTS = 3;

  public static instance: Text;
  public static instanceFn: () => Text;
  public static reloadSignal = new Signal(Text.RELOAD_TEXT_SIGNAL);

  private availableBundles: { [key: string]: { [key: string]: string } };
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
    if (category !== undefined) return category;

    let attempts = 0;
    while (category === undefined && attempts < Text.RETRY_ATTEMPTS) {
      attempts++;
      category = await fetch(
        `${Configuration.instance.path.language}${Configuration.instance.getLanguage()}/${name}.json`,
      ).then((response) => response.json());
    }

    this.availableBundles[name] = category;
    return category;
  }

  /**
   * Get the text from the category
   * @param category The category to get the text from
   * @param key The key of the text
   * @returns The text
   */
  public async get(category: string, key: string) {
    const categoryBundle = await this.getCategory(category);
    if (categoryBundle === undefined) return "";

    const text = categoryBundle[key];
    if (text === undefined) return "";

    return text;
  }

  /**
   * Update the bundle with the current language
   */
  async update() {}
}

Text.reloadSignal.subscribe(Text.instance);
