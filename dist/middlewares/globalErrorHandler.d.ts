import type { NextFunction, Request, Response } from "express";
interface AppError extends Error {
    statusCode?: number;
    isOperational?: boolean;
    meta?: {};
}
declare const globalErrorHandler: (err: AppError, req: Request, res: Response, next: NextFunction) => void;
export default globalErrorHandler;
//# sourceMappingURL=globalErrorHandler.d.ts.map