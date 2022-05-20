const localConfig = require("../../config.json");
import { get }  from "lodash";


export const conf_get = <ReturnType>(key : string, defaultVal : ReturnType | null) : ReturnType => {
    return get(localConfig, key, defaultVal);
};