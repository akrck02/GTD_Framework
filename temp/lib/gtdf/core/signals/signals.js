var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Singleton } from "../decorator/singleton.js";
import { StaticImplements } from "../static/static.inteface.js";
let Signal = class Signal {
    constructor(id, sync = false) {
        this.id = id;
        this.sync = sync;
        this.subscribers = [];
        this.content = {};
    }
    static instance() {
        return this._instance;
    }
    /**
     * Subscribe an observer to the signal
     */
    subscribe(observer) {
        this.subscribers.push(observer);
    }
    /**
     * Unsubscribe an observer from the signal
     */
    unsubscribe(observer) {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
    }
    /**
     * notify the current state to all subscribers
     */
    async notify() {
        for (let observer of this.subscribers) {
            try {
                if (this.sync)
                    await observer.update(this.content);
                else
                    observer.update(this.content);
            }
            catch (e) {
                console.error(`Error notifying observer on signal ${this.id}`, e);
            }
        }
    }
    /**
     * emit the signal with given data
     */
    async emit(data) {
        this.content = data;
        await this.notify();
    }
};
Signal = __decorate([
    Singleton(),
    StaticImplements(),
    __metadata("design:paramtypes", [String, Object])
], Signal);
export { Signal };
