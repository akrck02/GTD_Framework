import IEvent from "../../lib/gtdf/core/event/event.js";

export default class KeyboardLoader implements IEvent {
  async start() {
    console.log("KeyboardLoader started");
  }
}
