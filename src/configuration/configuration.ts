import { ISingleton, Singleton } from "../lib/gtdf/core/decorator/singleton.js";
import { StaticImplements } from "../lib/gtdf/core/static/static.inteface.js";
import Urls from "../lib/gtdf/data/urls.js";
import Language, { ILanguage } from "../lib/gtdf/language/language.js";

/**
 * Environment states
 */
export enum Environment {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

/**
 * Available themes for the application
 */
export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

/**
 * General variables for the application
 */
interface IVariables {
  animations: boolean;
  environment: Environment;
  language: string;
}

/**
 * Base configuration for the application
 */
interface IBase {
  app_name: string;
  app_version: string;
  environment: Environment;
  author: string;
}

/**
 * Path configurations for the application
 */
interface IPath {
  url: string;
  app: string;
  resources: string;
  language: string;
  images: string;
  icons: string;
}

/**
 * Views paths for the application
 */
interface IViews {
  url: string;
  home: string;
  error: string;
  blank: string;
}

/**
 * Configuration interface
 */
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
  private static readonly URL_KEY: string = "url";
  private static readonly CONFIGURATION_NAME_APPENDIX: string = "-config";

  public static instance: Configuration;
  public static instanceFn: () => Configuration;

  variables: IVariables;
  base: IBase;
  path: IPath;
  views: IViews;
  api: any;

  /**
   * Load a configuration object into the class
   * this mehod adapts the urls
   */
  load(response: IConfiguration) {
    this.variables = response.variables;
    this.base = response.base;
    this.path = response.path;
    this.views = response.views;
    this.api = response.api;

    for (const key in this.path) {
      if (key == Configuration.URL_KEY) {
        this.path[key] = Urls.addSlash(this.path[key]);
        continue;
      }

      this.path[key] = this.path.url + Urls.addSlash(this.path[key]);
    }

    for (const key in this.views) {
      const element = this.views[key];
      if (key == Configuration.URL_KEY) {
        this.views[key] = Urls.addStartSlash(this.views[key]);
        this.views[key] = Urls.addSlash(this.views[key]);
        continue;
      }

      this.views[key] = this.views.url + Urls.addSlash(this.views[key]);
    }

    for (const key in this.api) {
      const element = this.api[key];
      if (key == Configuration.URL_KEY) {
        this.api[key] = Urls.addSlash(this.api[key]);
        continue;
      }

      this.api[key] = this.api.url + this.api[key];
    }

    this.setDefaultVariablesIfNeeded();
  }

  /**
   * Set configuration variables with default values
   * if they are not set
   */
  setDefaultVariablesIfNeeded() {
    if (
      this.getStorageConfigurationVariable(Configuration.ANIMATION_KEY) ==
      undefined
    )
      this.setAnimations(true);

    if (
      this.getStorageConfigurationVariable(Configuration.LANGUAGE_KEY) ==
      undefined
    )
      this.setLanguage(Language.get(navigator.language).main);

    if (this.getStorageConfigurationVariable(Configuration.THEME) == undefined)
      this.setTheme(Theme.LIGHT);
    else if (this.isDarkTheme()) this.setDarkTheme();
    else this.setLightTheme();

    console.debug(
      "Theme: " + this.getStorageConfigurationVariable(Configuration.THEME),
    );
  }

  /**
   * Get application configurations from storage
   * @returns the application configurations
   */
  public getStorageConfiguration() {
    let localStorageConfiguration = JSON.parse(
      localStorage.getItem(
        this.base.app_name + Configuration.CONFIGURATION_NAME_APPENDIX,
      ),
    );

    if (!localStorageConfiguration) localStorageConfiguration = {};
    return localStorageConfiguration;
  }
  /**
   * Add a configuration variable to storage
   * @param key the name of the variable
   * @param value the value of the variable
   */
  public setStorageConfigurationVariable(key: string, value: any) {
    let localStorageConfiguration = this.getStorageConfiguration();
    const config = localStorageConfiguration;
    config[key] = value;
    localStorage.setItem(
      this.base.app_name + Configuration.CONFIGURATION_NAME_APPENDIX,
      JSON.stringify(config),
    );
  }

  /**
   * Get a configuration variable from storage
   * @param key the name of the variable
   * @returns the value of the variable
   */
  public getStorageConfigurationVariable(key: string): string {
    let localStorageConfiguration = this.getStorageConfiguration();
    return localStorageConfiguration[key];
  }

  /**
   * Set animation for application on|off
   * @param on The boolean to set animations
   */
  public setAnimations(on: boolean) {
    this.setStorageConfigurationVariable(Configuration.ANIMATION_KEY, on);
  }

  /**
   * Get if animations are enabled
   * @returns if animations are enabled
   */
  public areAnimationsEnabled(): boolean {
    return (
      this.getStorageConfigurationVariable(Configuration.ANIMATION_KEY) ===
      "true"
    );
  }

  /**
   * Set the application language
   */
  public setLanguage(lang: string) {
    this.setStorageConfigurationVariable(Configuration.LANGUAGE_KEY, lang);
  }

  /**
   * Get the current app language
   * @returns The app language
   */
  public getLanguage(): ILanguage {
    return Language.get(
      this.getStorageConfigurationVariable(Configuration.LANGUAGE_KEY),
    );
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
  public setTheme(theme: Theme) {
    this.setStorageConfigurationVariable(Configuration.THEME, theme);
  }

  /**
   * Get if animations are enabled
   * @returns if animations are enabled
   */
  public isDarkTheme(): boolean {
    return (
      this.getStorageConfigurationVariable(Configuration.THEME) === Theme.DARK
    );
  }

  /**
   * Toggle the theme of the application
   */
  public toggleTheme(): Theme {
    if (this.isDarkTheme()) return this.setLightTheme();
    else return this.setDarkTheme();
  }

  /**
   * Set the theme of the application to dark
   */
  public setDarkTheme(): Theme {
    document.documentElement.dataset.theme = Theme.DARK;
    this.setTheme(Theme.DARK);
    return Theme.DARK;
  }

  /**
   * Set the theme of the application to light
   */
  public setLightTheme(): Theme {
    document.documentElement.dataset.theme = Theme.LIGHT;
    this.setTheme(Theme.LIGHT);
    return Theme.LIGHT;
  }

  /**
   * Get if the application is in development mode
   */
  public isDevelopment(): boolean {
    return this.base.environment === Environment.DEVELOPMENT;
  }
}
