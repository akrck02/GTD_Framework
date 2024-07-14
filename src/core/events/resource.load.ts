import { Text } from "../../language/text.js";
import IEvent from "../../lib/gtdf/core/event/event.js";
import MaterialIcons from "../../lib/material/material.icons.js";

export default class ResourceLoader implements IEvent {
  async start() {
    await MaterialIcons.instance.loader.update();
  }
}
