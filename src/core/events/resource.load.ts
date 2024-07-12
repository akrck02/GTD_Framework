import IEvent from "../../lib/gtdf/core/event/event.js";

export default class ResourceLoader implements IEvent {
  async start() {
    console.log("ResourceLoader started");
  }
}
