/**
 * Buffer of global signals
 */
export class SignalBuffer {
    static instance() {
        return this._instance;
    }
    static add(signal) {
        this.signals[signal.id] = signal;
    }
    static remove(signal) {
        this.signals[signal.id] = undefined;
    }
    static search(id) {
        return this.signals[id];
    }
}
SignalBuffer.signals = {};
