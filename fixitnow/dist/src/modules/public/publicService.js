import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../../lib/asyncWrapper";
export const index = asyncWrapper(async (_, res) => {
    res.status(StatusCodes.OK).json({
        message: "Working",
    });
});
export const getServices = asyncWrapper(async (req, res) => {
    res.status(StatusCodes.OK).json({
        message: `From ${req.path} `,
    });
});
export const getTechnicians = asyncWrapper(async (req, res) => {
    res.status(StatusCodes.OK).json({
        message: `From ${req.path} `,
    });
});
export const getTechniciansById = asyncWrapper(async (req, res) => {
    res.status(StatusCodes.OK).json({
        message: `From ${req.path} `,
    });
});
export const getCategories = asyncWrapper(async (req, res) => {
    res.status(StatusCodes.OK).json({
        message: `From ${req.path} `,
    });
});
//# sourceMappingURL=publicService.js.map