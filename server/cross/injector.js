"use strict";
class Injector {
    static getRegistered(key) {
        var registered = Injector.registry[key];
        if (registered) {
            return registered;
        }
        else {
            throw new Error(`Error: ${key} was not registered.`);
        }
    }
    static register(key, value) {
        var registered = Injector.registry[key];
        if (registered) {
            throw new Error(`Error: ${key} is already registered.`);
        }
        Injector.registry[key] = value;
    }
    static clear() {
        Injector.registry = {};
    }
}
Injector.registry = {};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Injector;
