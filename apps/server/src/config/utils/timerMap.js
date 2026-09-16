"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timers = exports.TimerMap = void 0;
class TimerMap extends Map {
    pause(key) {
        const state = this.get(key);
        if (!state || state.isPaused)
            return;
        // Calculate elapsed time and update remaining
        const elapsed = Date.now() - state.startTime;
        state.remaining -= elapsed;
        state.isPaused = true;
        clearTimeout(state.id);
    }
    resume(key) {
        const state = this.get(key);
        if (!state || !state.isPaused)
            return;
        state.isPaused = false;
        state.startTime = Date.now();
        state.id = setTimeout(() => {
            state.callback();
            this.delete(key);
        }, state.remaining);
    }
    delete(key) {
        const timeout = super.get(key);
        if (timeout)
            clearTimeout(timeout.id);
        return super.delete(key);
    }
    setTimer(key, clbFn, time) {
        // Auto-clean previous timer if it exists
        this.delete(key);
        const timeout = setTimeout(() => {
            clbFn();
            this.delete(key); // Cleanup map once finished
        }, time);
        return super.set(key, {
            id: timeout,
            isPaused: false,
            startTime: Date.now(),
            remaining: time,
            callback: clbFn
        });
    }
    clear() {
        this.forEach((timeout) => { clearTimeout(timeout.id); });
        return super.clear();
    }
}
exports.default = TimerMap;
exports.TimerMap = TimerMap;
const Timers = new TimerMap();
exports.Timers = Timers;
