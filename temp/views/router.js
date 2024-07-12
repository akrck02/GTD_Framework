var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Router_1;
import { SignalBuffer } from "../core/signal.buffer.js";
import InitializeError from "../error/initialize.error.js";
import { HTML } from "../lib/gtdf/component/dom.js";
import { UIComponent } from "../lib/gtdf/component/ui.component.js";
import { Routes } from "../lib/gtdf/core/decorator/route.js";
import { Singleton } from "../lib/gtdf/core/decorator/singleton.js";
import { Signal } from "../lib/gtdf/core/signals/signals.js";
import { StaticImplements } from "../lib/gtdf/core/static/static.inteface.js";
import ErrorView from "./error/error.view.ui.js";
import HomeView from "./home/home.view.ui.js";
let Router = Router_1 = class Router {
    constructor() {
        this.Endpoints = [HomeView, ErrorView];
        this.parent = document.getElementById("view-container");
        //If no parent is present on the HTML file throws an error
        if (!this.parent) {
            throw new InitializeError("view-container does not exist");
        }
        this.container = new UIComponent({
            type: HTML.DIV,
            id: "view-container-box",
            styles: {
                width: "100%",
                height: "100%",
            },
        });
        this.container.appendTo(this.parent);
        this.changeViewRequestedSignal = new Signal(Router_1.VIEW_CHANGE_REQUESTED_SIGNAL);
        SignalBuffer.add(this.changeViewRequestedSignal);
        this.changeViewRequestedSignal.subscribe(this);
    }
    async update(data) {
        console.debug(data);
        console.debug(`Router update to /${data.view}`);
        let params = [];
        if (data.params) {
            params.push(data.view);
            params = params.concat(data.params);
        }
        await this.load(params);
    }
    /**
     * Load the app state with the given params
     * @param params The list of params
     */
    async load(params) {
        try {
            this.container.clean();
            this.clear();
            // load the ViewUI instances created with the @Route decorator
            for (const route of Routes)
                if (await this.navigate(route, params))
                    return;
            ErrorView.instance().show(["404"], this.container);
        }
        catch (error) {
            console.error(error);
        }
    }
    async navigate(view, params = []) {
        if (!view.isPointing(params[0]))
            return false;
        view.clean();
        await view.show(params.splice(1), this.container);
        return true;
    }
    /**
     * Clear the container
     */
    clear() {
        this.container.element.innerHTML = "";
    }
};
Router.VIEW_CONTAINER_ID = "view-container";
Router.VIEW_CHANGE_REQUESTED_SIGNAL = "viewChangeRequested";
Router = Router_1 = __decorate([
    Singleton(),
    StaticImplements(),
    __metadata("design:paramtypes", [])
], Router);
export default Router;
