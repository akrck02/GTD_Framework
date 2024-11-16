import { Configuration } from "./configuration/configuration.js";
import BootHandler from "./core/boot.handler.js";
import { ISingleton, Singleton } from "./lib/gtdf/core/decorator/singleton.js";
import { StaticImplements } from "./lib/gtdf/core/static/static.inteface.js";
import Urls from "./lib/gtdf/data/urls.js";
import Router from "./views/router.js";

/**
 * Class that represents the application frontend proccess
 * it can be intantiated more than once, but the classic
 * web application structure wont need it.
 * @author akrck02
 */
@Singleton()
@StaticImplements<ISingleton<App>>()
export default class App {
  private boot: BootHandler;
  static instanceFn: () => App;
  static instance: App;

  constructor() {}

  async load() {
    this.boot = new BootHandler();
    await this.boot.start();
    this.overrides();

    const params = Urls.getParametersByIndex(
      window.location.hash.slice(1).toLowerCase(),
      1,
    );
    Router.instance.load(params);
    console.debug("App is starting...");
  }

  overrides() {
    console.debug = (logs) => {
      if (Configuration.instance.isDevelopment()) console.log(logs);
    };
  }

  async start() {
    await this.boot.start();
  }
}
