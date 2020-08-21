
const NgxLightboxUtils = ({

    /**
     * Recursive object merge
     * @param {T} objA
     * @param {T} objB
     * @param {boolean} recursiveMerge
     * @return {T}
     */
    merge<T = {[key: string]: any}>(objA: T, objB: T, recursiveMerge = true): T {
        const result: T = objA;

        for (const item of Object.entries(objB)) {
            const [key, value] = item;

            if ((value as any) instanceof Object && recursiveMerge) {
                if (key in result && (result[key] instanceof Object)) {
                    result[key] = this.merge(result[key], value);
                } else {
                    result[key] = value;
                }
            } else {
                result[key] = value;
            }
        }

        return result;
    },

    /**
     * @param target
     * @param source
     */
    parse(target: any, source: any): void {
        Object.assign(target, source);
    }
});

export default NgxLightboxUtils;
