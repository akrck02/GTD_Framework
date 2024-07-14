/**
 * This class is used to provide utility functions for strings
 * @author akrck02
 */
export default class Strings {
  public static toNormalCase(str: string): string {
    if (str.length < 2) {
      return str.toUpperCase();
    }

    return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
  }
}

/**
 * This interface is used to represent a map of strings
 */
export interface StringMap {
  [key: string]: string;
}
