import { ISingleton, Singleton } from "../lib/gtdf/core/decorator/singleton.js";
import { StaticImplements } from "../lib/gtdf/core/static/static.inteface.js";
import Urls from "../lib/gtdf/data/urls.js";
import Language from "../lib/gtdf/language/language.js";

/**
 * Environment states
 */
export enum ENVIRONMENT {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

interface IVariables {
  animations: boolean;
  environment: ENVIRONMENT;
  language: string;
}

interface IBase {
  app_name: string;
  app_version: string;
  environment: ENVIRONMENT;
  author: string;
}

interface IPath {
  url: string;
  app: string;
  resources: string;
  language: string;
  images: string;
  icons: string;
}

interface IViews {
  url: string;
  home: string;
  error: string;
  blank: string;
}

interface IConfiguration {
  variables: IVariables;
  base: IBase;
  path: IPath;
  views: IViews;
  api: any;
}

/**
 * Configuration for the application
 */
@Singleton()
@StaticImplements<ISingleton<Configuration>>()
export class Configuration implements IConfiguration {
  private static readonly ANIMATION_KEY: string = "animations";
  private static readonly LANGUAGE_KEY: string = "language";
  private static readonly THEME: string = "theme";

  public static _instance: any;
  public static instance(): any {
    return this._instance;
  }

  variables: IVariables;
  base: IBase;
  path: IPath;
  views: IViews;
  api: any;

  load(response: IConfiguration) {
    this.variables = response.variables;
    this.base = response.base;
    this.path = response.path;
    this.views = response.views;
    this.api = response.api;

    for (const key in this.path) {
      if (key == "url") {
        this.path[key] = Urls.addSlash(this.path[key]);
        continue;
      }

      this.path[key] = this.path.url + Urls.addSlash(this.path[key]);
    }

    for (const key in this.views) {
      const element = this.views[key];
      if (key == "url") {
        this.views[key] = Urls.addStartSlash(this.views[key]);
        this.views[key] = Urls.addSlash(this.views[key]);
        continue;
      }

      this.views[key] = this.views.url + Urls.addSlash(this.views[key]);
    }

    for (const key in this.api) {
      const element = this.api[key];
      if (key == "url") {
        this.api[key] = Urls.addSlash(this.api[key]);
        continue;
      }

      this.api[key] = this.api.url + this.api[key];
    }

    this.setDefaultVariablesIfNeeded();
  }

  /**
   * Get a configuration variable
   */
  setDefaultVariablesIfNeeded() {
    if (this.getConfigVariable(Configuration.ANIMATION_KEY) == undefined) {
      this.setAnimations(true);
    }

    if (this.getConfigVariable(Configuration.LANGUAGE_KEY) == undefined) {
      console.log(Language.get(navigator.language));

      this.setLanguage(Language.get(navigator.language));
    }

    if (this.getConfigVariable(Configuration.THEME) == undefined) {
      this.setTheme("light");
    } else {
      if (this.isDarkTheme()) {
        this.setDarkMode();
      } else {
        this.setLightMode();
      }
    }
  }

  /**
   * Get application configurations
   * @returns the application configurations
   */
  public getConfig() {
    let localStorageConfiguration = JSON.parse(
      localStorage.getItem(this.base.app_name + "-config"),
    );

    if (!localStorageConfiguration) {
      localStorageConfiguration = {};
    }

    return localStorageConfiguration;
  }
  /**
   * Add a configuration variable
   * @param key the name of the variable
   * @param value the value of the variable
   */
  public setConfigVariable(key: string, value: any) {
    let localStorageConfiguration = this.getConfig();
    const config = localStorageConfiguration;
    config[key] = value;
    localStorage.setItem(
      this.base.app_name + "-config",
      JSON.stringify(config),
    );
  }

  /**
   * Get a configuration variable
   * @param key the name of the variable
   * @returns the value of the variable
   */
  public getConfigVariable(key: string): string {
    let localStorageConfiguration = this.getConfig();
    return localStorageConfiguration[key];
  }

  /**
   * Set animation for application on|off
   * @param on The boolean to set animations
   */
  public setAnimations(on: boolean) {
    this.setConfigVariable(Configuration.ANIMATION_KEY, on);
  }

  /**
   * Get if animations are enabled
   * @returns if animations are enabled
   */
  public areAnimationsEnabled(): boolean {
    return this.getConfigVariable(Configuration.ANIMATION_KEY) === "true";
  }

  /**
   * Set the application language
   */
  public setLanguage(lang: string) {
    this.setConfigVariable(Configuration.LANGUAGE_KEY, lang);
  }

  /**
   * Get the current app language
   * @returns The app language
   */
  public getLanguage(): string {
    return Language.get(this.getConfigVariable(Configuration.LANGUAGE_KEY));
  }

  /**
   * Set the title of the page
   * @param title The title of the page
   */
  public setTitle(title: string) {
    document.title = title;
    window.history.pushState({}, title, window.location.href);
  }

  /**
   * Set animation for application on|off
   * @param on The boolean to set animations
   */
  public setTheme(theme: string) {
    this.setConfigVariable(Configuration.THEME, theme);
  }

  /**
   * Get if animations are enabled
   * @returns if animations are enabled
   */
  public isDarkTheme(): boolean {
    return this.getConfigVariable(Configuration.THEME) === "dark";
  }

  public toggleTheme() {
    if (this.isDarkTheme()) {
      this.setLightMode();
      return "dark";
    } else {
      this.setDarkMode();
      return "light";
    }
  }

  public setDarkMode() {
    document.documentElement.dataset.theme = "dark";
    this.setTheme("dark");
  }

  public setLightMode() {
    document.documentElement.dataset.theme = "light";
    this.setTheme("light");
  }
}
