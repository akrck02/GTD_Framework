import { UIComponent } from "../../lib/gtdf/component/ui.component.js";
import MaterialIcons from "../../lib/material/material.icons.js";
export default class Select extends UIComponent {
    constructor(map, onclick, selected = Object.keys(map)[0]) {
        super({
            type: "gtdf-select",
            classes: ["box-column"],
        });
        this.selected = 0;
        const displayBox = new UIComponent({
            type: "div",
            classes: ["box-row"],
            id: Select.DISPLAY_BOX_ID,
        });
        displayBox.appendTo(this);
        displayBox.setEvents({
            click: (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (this.element.classList.contains("show")) {
                    this.element.classList.remove("show");
                    return;
                }
                this.element.classList.add("show");
            },
        });
        this.display = new UIComponent({
            type: "p",
            text: selected,
            data: {
                value: map[selected],
            },
        });
        this.display.appendTo(displayBox);
        const icon = MaterialIcons.get("expand", {
            size: "1.15em",
            fill: "#404040",
        });
        icon.element.id = Select.DISPLAY_BOX_ICON_ID;
        icon.appendTo(displayBox);
        this.selector = new UIComponent({
            type: "div",
            id: Select.SELECTOR_ID,
            classes: ["box-column"],
        });
        Object.keys(map).forEach((l) => {
            const option = new UIComponent({
                type: "div",
                text: l,
                classes: [Select.OPTION_CLASS],
                data: {
                    value: map[l],
                },
            });
            option.setEvents({
                click: () => {
                    onclick(option.element.dataset.value);
                },
            });
            option.appendTo(this.selector);
        });
        this.selector.appendTo(this);
    }
}
Select.DISPLAY_BOX_ID = "display-box";
Select.DISPLAY_BOX_ICON_ID = "display-box-icon";
Select.SELECTOR_ID = "selector";
Select.OPTION_CLASS = "option";
