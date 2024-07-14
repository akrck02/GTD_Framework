import { ViewUI } from "../../view/view.ui.js";

/*
 * This is filled by the annotation processor with the ViewUI instances
 * that have the @Route annotation
 * @author akrck02
 */
export const Routes: ViewUI[] = [];

/*
 * This is the annotation that will be used to register the routes
 * @author akrck02
 */
export function Route(value: string | string[]) {
  return (target: any) => {
    if (!target.instance)
      throw new Error(
        "The @Route annotation can only be used in ViewUI instances",
      );

    if (typeof value == "string") target.instance.routes = [value];
    else target.instance.routes = value;

    // if it is no ViewUI instance, it will not be added to the Routes
    console.debug(`Route registered /${value}`);
    Routes.push(target.instance);
  };
}
