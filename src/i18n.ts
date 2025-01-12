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
 * Load a text bundle if needed 
 * @param id The bundle id 
 * @param maxAttemps (Optional) The max number of attemps, one by default 
 */
export async function loadBundle(id : string, maxAttemps = 1) {

  // If the bundle exists, do nothing
  if(buffer.has(id))
    return

  // Try to get the bundle retrying if necessary
  let language = undefined
  
  for (let attemps = 0; attemps < maxAttemps && undefined == language; attemps++) {
    language = await fetch(`${I18N_PATH}/${currentLanguage.main}/${id}.json`).then(res => res.json())
  }

  // If nothing was found, return
  if(undefined == language)
    return

  // Add the bundle to buffer
  buffer.set(id, language)
}

/**
 * Get text from a bundle 
 * @param bundleId The bundle id to take the text from
 * @param textId The text id
 */
export function getText(bundleId : string, textId : string) : string {
  
  // If the bundle does not exists inside the buffer, return empty
  if(false == buffer.has(bundleId))
    return ""
  
  // If the text does not exist in the bundle, return empty
  const bundle = buffer.get(bundleId)
  if(false == bundle.has(textId))
    return ""
 
  // Return the text
  return bundle.get(textId)
}

