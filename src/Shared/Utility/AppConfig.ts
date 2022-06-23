// const localConfig = require("../../config.json");
import { get }  from "lodash";

let localConfig : any = {};

export const conf_set = (configObject: any) : void =>
{
    localConfig = configObject;
}


export const conf_get = <ReturnType>(key : string, defaultVal : ReturnType | null) : ReturnType => {
    return get(localConfig, key, defaultVal);
};