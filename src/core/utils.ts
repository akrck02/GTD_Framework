import { Configuration } from "../configuration/configuration.js";

export default class Utils {
  public static copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  /**
   * Redirect to url with '/' separated params
   * @param url The URL to be redirected to
   * @param params The parameter Array
   */
  public static redirect(
    url: string,
    params: string[],
    force: boolean = false,
  ) {
    if (force) location.href = Configuration.instance.views.blank;

    url += params.join("/");
    location.href = url;
  }
}
