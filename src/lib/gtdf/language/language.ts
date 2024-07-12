export const Languages = {
  ENGLISH: "en",
};

export default class Language {
  static get(locale: string): string {
    if (!locale) {
      return Languages.ENGLISH;
    }

    const keys = Object.keys(Languages);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (locale.includes(Languages[key])) {
        return Languages[key];
      }
    }

    return Languages[keys[0]];
  }

  static getName(locale: string): string {
    if (!locale) {
      return Languages.ENGLISH;
    }

    const keys = Object.keys(Languages);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      if (locale.includes(Languages[key])) {
        return key;
      }
    }

    return keys[0];
  }
}
