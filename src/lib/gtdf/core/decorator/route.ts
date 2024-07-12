// this is filled by the annotation processor with the ViewUI instances
// that have the @Route annotation
export const Routes = [];

// This is the annotation that will be used to register the routes
export function Route(value: string | string[]) {
  return function (target: any) {
    if (typeof value == "string") {
      target.instance().routes = [value];
    } else {
      target.instance().routes = value;
    }

    console.debug(`Route registered /${value}`);
    Routes.push(target.instance());
  };
}
