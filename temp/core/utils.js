import { Configuration } from "../configuration/configuration";
export default class Utils {
    static copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    }
    /**
     * Redirect to url with '/' separated params
     * @param url The URL to be redirected to
     * @param params The parameter Array
     */
    static redirect(url, params, force = false) {
        if (force) {
            location.href = Configuration.instance().Views.blank;
        }
        url += params.join("/");
        location.href = url;
    }
}
