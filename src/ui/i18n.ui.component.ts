import { Configuration } from "../../../configuration/configuration.js";
import { Text } from "../../../language/text.js";
import Language from "../language/language.js";
import DOM from "./dom.js";
import { UIComponent, UIProperties } from "./ui.component.js";

/**
 * Properties for the I18nUIComponent
 * @extends UIProperties The properties of the UIComponent
 * @author akrck02
 */
export interface I18nUIProperties extends UIProperties {
  category: string;
  name: string;
}

/**
 * This class represents a UIComponent that translates the text
 * of the component to the language of the user.
 * @extends UIComponent The UIComponent class.
 * @author akrck02
 */
export default class I18nUIComponent extends UIComponent {
  private category: string;
  private name: string;

  constructor(properties: I18nUIProperties) {
    super(properties);
    this.category = properties.category;
    this.name = properties.name;
    Text.reloadTextSignal.connect({
      origin: "I18nUIComponent" + this.name,
      action: (data: Language) => this.translate(),
    });
    this.translate();
  }

  /**
   * This method will be called when the component is created
   * and will translate the text of the component
   * @returns The translated text
   */
  private async getTranslatedText(): Promise<string> {
    return await Text.instance.get(this.category, this.name);
  }

  /**
   * This method will be called when the component is created
   */
  private async translate() {
    this.element.innerText = await this.getTranslatedText();
  }
}
