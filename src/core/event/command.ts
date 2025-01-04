import IEvent from "./event.js";

/**
 * Interface representing a command
 * that has a method watch if a predicate matches
 * and other method to execute the command itself
 */
export default interface ICommand {
  listener: IEvent;
  match(predicate: string): boolean;
  execute(predicate: string): Promise<void>;
}
