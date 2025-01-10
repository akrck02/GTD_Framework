import { viewHandler } from "./view.js";

const paths : Map<String, viewHandler> = new Map()
let notFoundHandler : viewHandler = async (_params : string[], container : HTMLElement) => {
  container.innerHTML = "Page not found."
}

/**
 * Register a new route.
 * @param path The router path
 * @param handler The route handler
 */
export function registerRoute(path : string, handler : viewHandler) {

  // If the path is empry return 
  if(undefined == path)
    return

  // If the path is blank or /, register home and return
  path = path.trim()
  if("" == path || "/" == path){   
    // TODO: register here.
    return
  } 

  // If the path ends with / trim it
  if("/" == path.substring(path.length - 1))
    path = path.substring(0, path.length - 1)

  // Replace all the variables with regex expressions to capture them later
  const regexp : RegExp = /\/\(\$+)\/*/g
  path = path.replaceAll(regexp, "/()/")  

  paths.set(path, handler)
  console.log(`Route registered ${path}`)

}

/**
 * Register the route to display when route path is not found.
 * @param handler The view handler to call
 */
export function registerNotFoundRoute(handler : viewHandler) {
  notFoundHandler = handler
}

/**
 * Show view for the given route.
 * @param path The given path to search for
 * @param container The container to display the views in 
 */
export function showViewForRoute(path: string, container : HTMLElement) {

  container.innerHTML = ""
  
  for (const route in paths) {

    // Check route if has property
    if (false == paths.hasOwnProperty(route))
      break

    // Check if route matches
    const regexp = RegExp(route)
    const params = path.match(regexp)
    if(null != params && 0 != params.length){
      paths[route](params.slice(1), container)
      return
    }
  }
  
  // If no route found, show not found view.
  notFoundHandler([], container)
}
