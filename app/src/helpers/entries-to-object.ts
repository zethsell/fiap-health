export function entriesToObject(data: any) {
    const newObj = {} as any
    for (const [key, val] of data) {
        newObj[key] = val;
    }
    return newObj
}