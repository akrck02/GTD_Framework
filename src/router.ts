import { getUrlParametersByIndex } from "./paths.js";
import { viewHandler } from "./view.js";
    
let routeRegistry : { [key : string] : viewHandler } = {}
let notFoundHandler : viewHandler = async (_params : string[], container : HTMLElement) => {container.innerHTML = "NotFound"};

/**
 * Register a new route.
 * @param path The router path
 * @param handler The route handler
 */
export function registerRoute(path : string, handler : viewHandler) {
 
  // /videos/categories/$categoryId/stream/$streamId
  const regexp : RegExp = /\/\$(\w+)\/*/g
  const pathRegex = path.replaceAll(regexp, "/([^\\\/]+)/*") 
  routeRegistry[pathRegex] = handler  
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
  for (const route in routeRegistry) {
    
    // Check route if has property
    if (false == routeRegistry.hasOwnProperty(route))
      break

    // Check if route matches
    const regexp = RegExp(route)
    const params = path.match(regexp)
    if(null != params && 0 != params.length){
      routeRegistry[route](params.slice(1), container)
      return
    }
  }

  // If no route found, show not found view.
  notFoundHandler([], container)
}
