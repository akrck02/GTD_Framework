import { Configuration } from "../../configuration/configuration.js";
import { BubbleUI } from "../bubble/bubble.js";
import { Html } from "../gtdf/component/dom.js";
import { UIComponent } from "../gtdf/component/ui.component.js";
import { ISingleton, Singleton } from "../gtdf/core/decorator/singleton.js";
import { IObserver } from "../gtdf/core/observable/observer.js";
import { StaticImplements } from "../gtdf/core/static/static.inteface.js";

/**
 * Material Icons properties
 * @property fill The fill color of the icon
 * @property size The size of the icon
 * @property classes The classes of the icon
 * @property svg The svg content of the icon [optional]
 * @author akrck02
 */
export interface MaterialIconsProperties {
  fill?: string | "#202020";
  size: string;
  classes?: string[] | [];
  svg?: string | "";
}

/**
 * Material icon loader class
 * loads the material icons from the json file
 * @implements IObserver the observer interface
 * @author akrck02
 */
export class MaterialIconsLoader implements IObserver {
  public collection: any;

  public constructor() {}

  async update() {
    if (this.collection != undefined) return;

    this.collection = await fetch(
      Configuration.instance.path.icons + "materialicons.json",
    ).then((response) => response.json());
  }
}

/**
 * Material Icon utility class
 * @implements IObserver the observer interface
 * @implements ISingleton the singleton interface
 * @author akrck02
 */
@Singleton()
@StaticImplements<ISingleton<MaterialIcons>>()
export default class MaterialIcons {
  public readonly loader: MaterialIconsLoader;
  public static instance: MaterialIcons;
  public static instanceFn: () => MaterialIcons;

  private constructor() {
    this.loader = new MaterialIconsLoader();
  }

  /**
   * Get collection of Material Icons
   * @returns The collection of Material Icons
   * @example
   *   MaterialIcons.collection();
   *
   *  // Returns
   * {
   *   "add": "<svg>...</svg>",
   *  "add_circle": "<svg>...</svg>",
   * ...
   * }
   */
  public get collection(): any {
    return this.loader.collection;
  }

  /**
   * Get a Material Icons SVG by name.
   * @param name The name of the icon.
   * @param properties The properties of the icon.
   * @returns The container of the SVG as a UIComponent.
   */
  public static get(
    name: string,
    properties: MaterialIconsProperties,
  ): UIComponent {
    properties.svg = MaterialIcons.instance.collection[name] || "";
    const icon = new UIComponent({
      type: Html.Div,
      classes: ["icon", BubbleUI.BoxCenter],
      text: createSVG(properties),
    });

    return icon;
  }
}

/**
 * Create svg in 24 x 24 viewBox
 * @param properties properties
 * @returns svg inside a string
 * @example
 *    createSvg({
 *        fill: '#202020',
 *        size: '24',
 *        classes: ['material-icons'],
 *        svg: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>'
 *    });
 *    // returns: <svg viewBox="0 0 24 24" class="material-icons">
 */
export function createSVG(properties: MaterialIconsProperties): string {
  const svg = `
    <svg class="${properties?.classes?.join(" ")}" width="${
      properties.size
    }" height="${properties.size}" viewBox="0 0 24 24" fill="${
      properties.fill
    }" xmlns="http://www.w3.org/2000/svg">
    ${properties.svg}
    </svg>
    `;
  return svg;
}
