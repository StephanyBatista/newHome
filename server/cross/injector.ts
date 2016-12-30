export default class Injector {

    private static registry: {[key: string]: any} = {};

    public static getRegistered(key: string): any {
        var registered = Injector.registry[key];
        if (registered) {
            return registered;
        } else {
            throw new Error(`Error: ${key} was not registered.`);
        }
    }

    public static register(key: string, value: any) {
        var registered = Injector.registry[key];
        if (registered) {
            throw new Error(`Error: ${key} is already registered.`);
        }
        Injector.registry[key] = value;
    }

    public static clear(): void {

        Injector.registry = {};
    }
}