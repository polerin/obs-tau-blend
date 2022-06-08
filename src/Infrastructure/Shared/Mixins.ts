import _ from "lodash";

type Constructor = new (...args: any[]) => {};


// @todo this does not currently work, also make it a decorator? Yay?
export function DynamicMethodCall< MethodSubjectName extends string, MethodSubjectData, TBase extends Constructor>(Base : TBase)
{
    return class DynamicEnabled extends Base {

        callDynamicMethod<DefaultReturnType>(subjectName : MethodSubjectName, subject : MethodSubjectData, prefix : string, defaultReturn : DefaultReturnType ) : DefaultReturnType
        {
            const functName = _.camelCase(prefix + subjectName);

            // @todo This is annoying, what is the right way to do this dynamic call in TS?
            // @ts-ignore
            return (typeof this[functName] == 'function') ? this[functName](message) : defaultReturn;
        }
    };
}
