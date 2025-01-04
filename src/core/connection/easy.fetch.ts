import { HttpMethod } from "./http.js";

type ResponseMiddleware = (res: globalThis.Response) => any;
type ResponseStatusFunction = (res: any) => any;
type ErrorFunction = (err: Error) => any;

/**
 * A class that represents a response from a fetch request.
 * @description Encapsulates the data and methods for easy fetching
 * @author Akrck02
 */
export class Response {
  private response: Promise<globalThis.Response>;
  private errorFunction: ErrorFunction;
  private statusFunctions: Map<number, ResponseStatusFunction>;
  private middleware: Function[];

  constructor(response: Promise<globalThis.Response>) {
    this.response = response;
    this.middleware = [];
    this.errorFunction = (err: any) =>
      console.error("Error in response : ", err);
    this.statusFunctions = new Map();
    this.statusFunctions.set(200, (res: any) => console.log("Success", res));
  }

  /**
   * Handles the response status code transforming the response with the responseTransformFunction
   * and executing the corresponding status function.
   * @param res The response object
   * @param statusFunctions The map of status functions
   * @param errorFunction The error function
   * @param responseTranformFunction The response transform function
   */
  private async handleResponseStatus(
    res: globalThis.Response,
    statusFunctions: Map<number, ResponseStatusFunction>,
    errorFunction: ErrorFunction,
    responseTranformFunction: ResponseMiddleware,
  ) {
    if (this.statusFunctions.has(res.status)) {
      let data = await responseTranformFunction(res);
      await this.statusFunctions.get(res.status)(data);
    } else this.errorFunction(new Error("Status code not handled"));
  }

  /**
   * Executes the callback functions corresponding to the status code getting the response as a json object.
   * in case of an error, the error function will be executed.
   *
   * @example
   * await EasyFetch.get({
   *   url: "https://mydomain/json/1",
   *   parameters: {
   *        name: "John",
   *   },
   *   headers: {
   *      "Content-type": "application/json",
   *   }
   * })
   * .status(200,(response) => {
   *    console.log(response);
   * })
   * .status(404,(response) => {
   *   console.log("NOT FOUND: ",response);
   * })
   * .error((error) => {
   *   console.error(error);
   * })
   * .json()
   */
  public async json() {
    await this.response
      .then(
        async (res) =>
          await this.handleResponseStatus(
            res,
            this.statusFunctions,
            this.errorFunction,
            async (res: globalThis.Response) => await res.json(),
          ),
      )
      .catch((err) => this.errorFunction(err));
  }

  /**
   * Executes the callback function corresponding to the status code getting the response as a text.
   * in case of an error, the error function will be executed.
   * @example
   * await EasyFetch.get({
   *   url: "https://mydomain/text/1",
   *   parameters: {
   *        name: "John",
   *   },
   *   headers: {
   *      "Content-type": "text/plain",
   *   }
   * })
   * .status(200,(response) => {
   *    console.log(response);
   * })
   * .status(404,(response) => {
   *   console.log("NOT FOUND: ",response);
   * })
   * .error((error) => {
   *   console.error(error);
   * })
   * .text()
   */
  public async text() {
    await this.response
      .then(
        async (res) =>
          await this.handleResponseStatus(
            res,
            this.statusFunctions,
            this.errorFunction,
            async (res: globalThis.Response) => await res.text(),
          ),
      )
      .catch((err) => this.errorFunction(err));
  }

  /**
   * Executes the callback function corresponding to the status code getting the response as a blob.
   * in case of an error, the error function will be executed.
   * @example
   * await EasyFetch.get({
   *  url: "https://mydomain/blob/1",
   * parameters: {
   *     name: "John",
   * },
   * headers: {
   *    "Content-type": "application/octet-stream",
   * }
   * })
   * .status(200,(response) => {
   *   console.log(response);
   * })
   * .status(404,(response) => {
   *  console.log("NOT FOUND: ",response);
   * })
   * .error((error) => {
   *  console.error(error);
   * })
   * .blob()
   */
  public async blob() {
    await this.response
      .then(
        async (res) =>
          await this.handleResponseStatus(
            res,
            this.statusFunctions,
            this.errorFunction,
            async (res: globalThis.Response) => await res.blob(),
          ),
      )
      .catch((err) => this.errorFunction(err));
  }

  /**
   * Sets the callback function to be executed corresponding to the status code.
   * @param code the status code or list of status codes
   * @param success the callback function
   * @returns the response itself
   */
  public status(
    code: number | number[],
    func: ResponseStatusFunction,
  ): Response {
    let numbers: number[] = [];

    if (typeof code === "number") {
      numbers.push(code);
    } else {
      numbers = code;
    }

    for (let i = 0; i < numbers.length; i++) {
      this.statusFunctions.set(numbers[i], func);
    }

    return this;
  }

  /**
   * Sets the callback function to be executed when the response is unsuccessful.
   * @param error the callback function
   * @returns the response itself
   */
  public error(error: ErrorFunction): Response {
    this.errorFunction = error;
    return this;
  }
}

/**
 * Properties for fetching data from server.
 * @interface FetchProperties
 * @property {string} url - Url of the server.
 * @property {HTTPS_METHOD} method - Method of the request.
 * @property {string} body - Body of the request.
 *
 */
export interface FetchProperties {
  method?: HttpMethod;
  parameters: object | FormData;
  url: string;
  charset?: string;
  contentType?: string;
  headers?: object;
}

export class EasyFetch {
  private static middleware: ResponseMiddleware[] = [];

  public static get(properties: FetchProperties): Response {
    return EasyFetch.exec({
      method: HttpMethod.Get,
      parameters: properties.parameters,
      url: properties.url,
      headers: properties.headers,
      charset: properties.charset,
      contentType: properties.contentType,
    });
  }

  public static post(properties: FetchProperties): Response {
    return EasyFetch.exec({
      method: HttpMethod.Post,
      parameters: properties.parameters,
      url: properties.url,
      headers: properties.headers,
      charset: properties.charset,
      contentType: properties.contentType,
    });
  }

  public static put(properties: FetchProperties): Response {
    return EasyFetch.exec({
      method: HttpMethod.Put,
      parameters: properties.parameters,
      url: properties.url,
      headers: properties.headers,
      charset: properties.charset,
      contentType: properties.contentType,
    });
  }

  public static delete(properties: FetchProperties): Response {
    return EasyFetch.exec({
      method: HttpMethod.Delete,
      parameters: properties.parameters,
      url: properties.url,
      headers: properties.headers,
      charset: properties.charset,
      contentType: properties.contentType,
    });
  }

  public static patch(properties: FetchProperties): Response {
    return EasyFetch.exec({
      method: HttpMethod.Patch,
      parameters: properties.parameters,
      url: properties.url,
      headers: properties.headers,
      charset: properties.charset,
      contentType: properties.contentType,
    });
  }

  public static head(properties: FetchProperties): Response {
    return EasyFetch.exec({
      method: HttpMethod.Head,
      parameters: properties.parameters,
      url: properties.url,
      headers: properties.headers,
      charset: properties.charset,
      contentType: properties.contentType,
    });
  }

  public static options(properties: FetchProperties): Response {
    return EasyFetch.exec({
      method: HttpMethod.Options,
      parameters: properties.parameters,
      url: properties.url,
      headers: properties.headers,
      charset: properties.charset,
      contentType: properties.contentType,
    });
  }

  public static connect(properties: FetchProperties): Response {
    return EasyFetch.exec({
      method: HttpMethod.Connect,
      parameters: properties.parameters,
      url: properties.url,
      headers: properties.headers,
      charset: properties.charset,
      contentType: properties.contentType,
    });
  }

  public static trace(properties: FetchProperties): Response {
    return EasyFetch.exec({
      method: HttpMethod.Trace,
      parameters: properties.parameters,
      url: properties.url,
      headers: properties.headers,
      charset: properties.charset,
      contentType: properties.contentType,
    });
  }

  public static update(properties: FetchProperties): Response {
    return EasyFetch.exec({
      method: HttpMethod.Update,
      parameters: properties.parameters,
      url: properties.url,
      headers: properties.headers,
      charset: properties.charset,
      contentType: properties.contentType,
    });
  }

  /**
   * Adds a middleware function to be executed before the request is sent.
   * @param func the middleware function
   */
  public static addMiddleware(func: ResponseMiddleware) {
    EasyFetch.middleware.push(func);
  }

  /**
   * Removes a middleware function.
   * @param func the middleware function
   * @returns true if the function was removed, false otherwise
   */

  private static exec(properties: FetchProperties): Response {
    let options = {
      method: properties.method,
      headers: {
        "Content-type": `${properties.contentType || "application/json"};charset=${properties.charset || "UTF-8"}`,
        mode: "cors",
        "Sec-Fetch-Site": "cross-site",
      },
    };

    properties.headers && Object.assign(options.headers, properties.headers);

    if (properties.method !== HttpMethod.Get) {
      if (properties.parameters instanceof FormData) {
        options["body"] = properties.parameters;
        options.headers["Content-type"] =
          `multipart/form-data;charset=${properties.charset || "UTF-8"}`;
      } else {
        options["body"] = JSON.stringify(properties.parameters);
      }
    }

    const promise = fetch(properties.url, options);
    return new Response(promise);
  }
}
