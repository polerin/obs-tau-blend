// const localConfig = require("../../config.json");
import { get, set }  from "lodash";

let localConfig : any = {};

/**
 * Load a full object for later use
 */
export function conf_load(configObject : any) : void {
    localConfig = configObject;
}

/**
 * Set a config value at `key`
 * 
 * Keys use the . path syntax
 */
export function conf_set(key : string, value : any) : void {
    set(localConfig, key, value);
}

/**
 * Get a pre-configured config value at `key`, or return defaultVal
 * 
 * keys use the . path syntax
 */
export function conf_get<ReturnType>(key : string, defaultVal : ReturnType | null) : ReturnType {
    return get(localConfig, key, defaultVal);
};