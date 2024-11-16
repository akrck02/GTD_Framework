import ConfigurationLoader from "./events/configuration.load.js";
import KeyboardLoader from "./events/keyboard.load.js";
import ResourceLoader from "./events/resource.load.js";

export default class BootHandler {
  configuration: ConfigurationLoader;
  resources: ResourceLoader;
  keyboard: KeyboardLoader;

  constructor() {
    this.configuration = new ConfigurationLoader();
    this.resources = new ResourceLoader();
    this.keyboard = new KeyboardLoader();
  }

  async start() {
    await this.configuration.start();
    await this.resources.start();
    await this.keyboard.start();
  }
}
