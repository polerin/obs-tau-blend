// const localConfig = require("../../config.json");
import _  from "lodash";

let localConfig : any = {};

export async function conf_fetch(uri: string): Promise<unknown> {
    const request = await fetch(uri);

    if (request.status !== 200) {
        throw new Error(`Unable to retrieve config from uri: ${uri}`);
    }

    return await request.json();
}

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
    _.set(localConfig, key, value);
}

/**
 * Get a pre-configured config value at `key`, or return defaultVal
 * 
 * keys use the . path syntax
 */
export function conf_get<ReturnType>(key : string, defaultVal : ReturnType | null) : ReturnType {
    return _.get(localConfig, key, defaultVal);
};