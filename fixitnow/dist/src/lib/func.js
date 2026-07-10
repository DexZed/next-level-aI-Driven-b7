export const success = (value) => ({ Ok: value });
export const failure = (error) => ({ Err: error });
export const isOk = (result) => {
    return 'Ok' in result;
};
export const isErr = (result) => {
    return 'Err' in result;
};
export const unwrap = (result) => {
    if (isOk(result)) {
        return result.Ok;
    }
    throw result.Err;
};
export const unwrapOrElse = (result, defaultValue) => {
    if (isOk(result)) {
        return result.Ok;
    }
    return defaultValue();
};
//# sourceMappingURL=func.js.map