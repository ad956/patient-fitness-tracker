import { AppError, errorHandler } from "./error-handler";
import dbConfig from "./db";
import fetchHandler from "./fetch-handler";
import FormValidator from "./form-validator";
import { generateOTP, generateSecureOTP } from "./generate-otp";
import getBaseUrl from "./get-base-url";
import { getCurrentDateFormatted, getFormattedDate } from "./get-date";
import getModelByRole from "./get-model-by-role";
import hashPassword from "./hash-password";

export * from "./constants";
export {
  AppError,
  dbConfig,
  errorHandler,
  fetchHandler,
  FormValidator,
  generateOTP,
  generateSecureOTP,
  getBaseUrl,
  getCurrentDateFormatted,
  getFormattedDate,
  getModelByRole,
  hashPassword,
};
