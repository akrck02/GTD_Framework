import { Configuration } from "../../configuration/configuration.js";
import Utils from "../../core/utils.js";
import { TextBundle } from "../../language/text.js";
import { ViewCore } from "../../lib/gtdf/view/view.core.js";
import LanguageService from "../../services/language.service.js";
export default class HomeViewCore extends ViewCore {
    /**
     * Get available languages to add to the select
     * @returns The available languages
     */
    static getLanguages() {
        const languages = LanguageService.getLanguages();
        const formatted = {};
        const list = Object.keys(languages);
        list.forEach((lang) => {
            formatted[lang.toUpperCase().substring(0, 1) + lang.toLowerCase().substring(1)] = languages[lang];
        });
        return formatted;
    }
    /**
     * Set the app language and reload
     * @param selected The selected language
     */
    static async setLanguage(selected) {
        Configuration.instance().setLanguage(selected);
        await TextBundle.reloadSignal.emit();
        Utils.redirect(Configuration.instance().Views.home, [], true);
    }
}
HomeViewCore.CONTRIBUTE_URL = "https://github.com/akrck02/GTD-Framework";
