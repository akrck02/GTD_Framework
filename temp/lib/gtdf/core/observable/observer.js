export class Observable {
    constructor(sync = false) {
        this.observers = [];
        this.sync = sync;
        let a = this;
        this.content = {};
        this.content = new Proxy(this.content, {
            set: function (target, key, value) {
                target[key] = value;
                a.notify();
                return true;
            },
        });
    }
    /**
     * Subscribe an observer to the observable
     * @param observer The observer to subscribe
     */
    async subscribe(observer) {
        this.observers.push(observer);
    }
    /**
     * Unsubscribe an observer from the observable
     * @param observer The observer to unsubscribe
     */
    async unsubscribe(observer) {
        this.observers = this.observers.filter((obs) => obs !== observer);
    }
    /**
     * Notify all observers of the
     */
    async notify() {
        for (let observer of this.observers) {
            try {
                if (this.sync)
                    await observer.update();
                else
                    observer.update();
            }
            catch (e) {
                console.error("Error notifying observer", e);
            }
        }
    }
}
