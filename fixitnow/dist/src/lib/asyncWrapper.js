export const asyncWrapper = (fn) => {
    return (req, res, next) => {
        return Promise.try(() => fn(req, res, next)).catch(next);
    };
};
//# sourceMappingURL=asyncWrapper.js.map