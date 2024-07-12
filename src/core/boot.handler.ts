import ConfigurationLoader from "./events/configuration.load.js";
import DisplayLoader from "./events/display.load.js";
import KeyboardLoader from "./events/keyboard.load.js";
import ResourceLoader from "./events/resource.load.js";

export default class BootHandler {
  configuration: ConfigurationLoader;
  resources: ResourceLoader;
  display: DisplayLoader;
  keyboard: KeyboardLoader;

  constructor() {
    this.configuration = new ConfigurationLoader();
    this.resources = new ResourceLoader();
    this.display = new DisplayLoader();
    this.keyboard = new KeyboardLoader();
  }

  async start() {
    await this.configuration.start();
    await this.resources.start();
    await this.display.start();
    await this.keyboard.start();
  }
}
