import { Configuration } from "../configuration/configuration";
import { Languages } from "../lib/gtdf/language/language";
export default class LanguageService {
    /**
     * Get available languages to add to the select
     * @returns The available languages
     */
    static getLanguages() {
        const formatted = {};
        const list = Object.keys(Languages);
        list.forEach((lang) => {
            formatted[lang.toUpperCase().substring(0, 1) + lang.toLowerCase().substring(1)] = Languages[lang];
        });
        return formatted;
    }
    /**
     * Get available languages to add to the select
     * @returns The available languages with names
     */
    static getAvailableLanguagesWithNames() {
        return Languages;
    }
    /**
     * Set the app language and reload
     * @param selected The selected language
     */
    static setLanguage(selected) {
        Configuration.instance().setLanguage(selected);
    }
}
