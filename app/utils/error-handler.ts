import { NextResponse } from "next/server";
import { STATUS_CODES } from "@utils/constants";

export class AppError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.name = "AppError";
  }
}

function createErrorResponse(err: AppError) {
  return {
    title: getErrorTitle(err.statusCode),
    message: err.message,
    stackTrace: process.env.NODE_ENV === "development" ? err.stack : null,
  };
}

function getErrorTitle(statusCode: number): string {
  const titles: Record<number, string> = {
    [STATUS_CODES.BAD_REQUEST]: "BAD_REQUEST",
    [STATUS_CODES.UNAUTHORIZED]: "UNAUTHORIZED",
    [STATUS_CODES.FORBIDDEN]: "FORBIDDEN",
    [STATUS_CODES.NOT_FOUND]: "NOT_FOUND",
    [STATUS_CODES.SERVER_ERROR]: "SERVER_ERROR",
  };
  return titles[statusCode] || "UNKNOWN_ERROR";
}

export function errorHandler(
  error?: AppError | string,
  statusCode: number = STATUS_CODES.SERVER_ERROR
) {
  const appError =
    error instanceof AppError
      ? error
      : new AppError(
          typeof error === "string" ? error : "Internal Server Error",
          statusCode
        );
  const errorResponse = createErrorResponse(appError);
  return NextResponse.json(errorResponse, { status: appError.statusCode });
}
