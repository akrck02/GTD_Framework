import IEvent from "../../lib/gtdf/core/event/event.js";

export default class DisplayLoader implements IEvent {
  async start() {
    console.log("DisplayLoader started");
  }
}
