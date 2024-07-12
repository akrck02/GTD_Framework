var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Configuration_1;
import { Singleton } from "../lib/gtdf/core/decorator/singleton.js";
import { StaticImplements } from "../lib/gtdf/core/static/static.inteface.js";
import Urls from "../lib/gtdf/data/urls.js";
import Language from "../lib/gtdf/language/language.js";
/**
 * Environment states
 */
export var ENVIRONMENT;
(function (ENVIRONMENT) {
    ENVIRONMENT["DEVELOPMENT"] = "development";
    ENVIRONMENT["PRODUCTION"] = "production";
})(ENVIRONMENT || (ENVIRONMENT = {}));
/**
 * Configuration for the application
 */
let Configuration = Configuration_1 = class Configuration {
    static instance() {
        return this._instance;
    }
    load(response) {
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
        if (this.getConfigVariable(Configuration_1.ANIMATION_KEY) == undefined) {
            this.setAnimations(true);
        }
        if (this.getConfigVariable(Configuration_1.LANGUAGE_KEY) == undefined) {
            console.log(Language.get(navigator.language));
            this.setLanguage(Language.get(navigator.language));
        }
        if (this.getConfigVariable(Configuration_1.THEME) == undefined) {
            this.setTheme("light");
        }
        else {
            if (this.isDarkTheme()) {
                this.setDarkMode();
            }
            else {
                this.setLightMode();
            }
        }
    }
    /**
     * Get application configurations
     * @returns the application configurations
     */
    getConfig() {
        let localStorageConfiguration = JSON.parse(localStorage.getItem(this.base.app_name + "-config"));
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
    setConfigVariable(key, value) {
        let localStorageConfiguration = this.getConfig();
        const config = localStorageConfiguration;
        config[key] = value;
        localStorage.setItem(this.base.app_name + "-config", JSON.stringify(config));
    }
    /**
     * Get a configuration variable
     * @param key the name of the variable
     * @returns the value of the variable
     */
    getConfigVariable(key) {
        let localStorageConfiguration = this.getConfig();
        return localStorageConfiguration[key];
    }
    /**
     * Set animation for application on|off
     * @param on The boolean to set animations
     */
    setAnimations(on) {
        this.setConfigVariable(Configuration_1.ANIMATION_KEY, on);
    }
    /**
     * Get if animations are enabled
     * @returns if animations are enabled
     */
    areAnimationsEnabled() {
        return this.getConfigVariable(Configuration_1.ANIMATION_KEY) === "true";
    }
    /**
     * Set the application language
     */
    setLanguage(lang) {
        this.setConfigVariable(Configuration_1.LANGUAGE_KEY, lang);
    }
    /**
     * Get the current app language
     * @returns The app language
     */
    getLanguage() {
        return Language.get(this.getConfigVariable(Configuration_1.LANGUAGE_KEY));
    }
    /**
     * Set the title of the page
     * @param title The title of the page
     */
    setTitle(title) {
        document.title = title;
        window.history.pushState({}, title, window.location.href);
    }
    /**
     * Set animation for application on|off
     * @param on The boolean to set animations
     */
    setTheme(theme) {
        this.setConfigVariable(Configuration_1.THEME, theme);
    }
    /**
     * Get if animations are enabled
     * @returns if animations are enabled
     */
    isDarkTheme() {
        return this.getConfigVariable(Configuration_1.THEME) === "dark";
    }
    toggleTheme() {
        if (this.isDarkTheme()) {
            this.setLightMode();
            return "dark";
        }
        else {
            this.setDarkMode();
            return "light";
        }
    }
    setDarkMode() {
        document.documentElement.dataset.theme = "dark";
        this.setTheme("dark");
    }
    setLightMode() {
        document.documentElement.dataset.theme = "light";
        this.setTheme("light");
    }
};
Configuration.ANIMATION_KEY = "animations";
Configuration.LANGUAGE_KEY = "language";
Configuration.THEME = "theme";
Configuration = Configuration_1 = __decorate([
    Singleton(),
    StaticImplements()
], Configuration);
export { Configuration };
