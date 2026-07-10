export type Result<T,E = Error> = { Ok: T } | { Err: E }

export const success = <T> (value:T) => ({ Ok: value })

export const failure = <E>(error:E) => ({Err: error})

export const isOk = <T,E> (result: Result<T,E>):result is { Ok: T } => {
    return 'Ok' in result
}

export const isErr = <T,E> (result: Result<T,E>):result is { Err: E } => {
    return 'Err' in result
}

export const unwrap = <T,E> (result: Result<T,E>):T => {
    if (isOk(result)) {
        return result.Ok
    }
    throw result.Err
}

export const unwrapOrElse = <T,E> (result: Result<T,E>, defaultValue: () => T):T => {
    if (isOk(result)) {
        return result.Ok
    }
    return defaultValue()
}