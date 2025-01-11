/**
 * This interface represents a lenguage
 * @author akrck02
 */
export interface ILanguage {
  name: string
  main: string
  locales: string[]
}

/**
 * Languages that can be used in the application
 * @author akrck02
 * 
 * INFO: Add languages here as needed 
 */
export const Languages = {
  English: { name: "english", main: "en", locales: ["en", "en-US", "en-GB"] },
  Spanish: { name: "spanish", main: "es", locales: ["es", "es-ES"] },
  Galician: { name: "galician", main : "gl", locales: ["gl", "gl-ES"] },
}

/** This language will be used if no other language is set */
const DEFAULT_LANGUAGE : ILanguage = Languages.English

/** Set here the available languages for the app **/
const AVAILABLE_LANGUAGES = [Languages.English]

/** This is the path of the i18n file structure **/
const I18N_PATH = "./i18n" 

/** This is the buffer **/ 
const buffer : Map<string, Map<string, string>> = new Map()

/** Current language for the web app **/
let currentLanguage : ILanguage = Languages.English


/**
 * Set current language by locale
 * @param locale The locale to get the language for
 */
export function setCurrentLanguage(locale : string) {
  
  if (undefined === locale) 
    currentLanguage = DEFAULT_LANGUAGE
  
  currentLanguage = AVAILABLE_LANGUAGES.find((lang) => lang.locales.includes(locale)) || DEFAULT_LANGUAGE 
}


/**
 * 
 */
export async function loadBundle(bundle : string) {
  const language = await fetch(`${I18N_PATH}/${bundle}.json`).then(res => res.json())
}

/**
 *
 */
export function getText(bundle : string, key : string) : string {
  

  return ""
}

