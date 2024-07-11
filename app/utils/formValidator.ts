import { toast } from "react-hot-toast";

type FieldError = string | null;

export default class FormValidator {
  private errors: Record<string, FieldError> = {};

  setError(field: string, error: FieldError) {
    this.errors[field] = error;
  }

  getError(field: string): FieldError {
    return this.errors[field] || null;
  }

  hasErrors(): boolean {
    return Object.values(this.errors).some((error) => !!error);
  }

  showToast(field: string) {
    const error = this.getError(field);
    if (error) {
      toast.error(error, { position: "bottom-center" });
    }
  }

  validateField(
    field: string,
    value: string,
    regex: RegExp,
    errorMessage: string
  ): boolean {
    const isValid = regex.test(value);
    this.setError(field, isValid ? null : errorMessage);
    return isValid;
  }

  static validateName(
    value: string,
    field: "firstname" | "lastname"
  ): FieldError {
    const regex =
      field === "firstname"
        ? /^[a-zA-Z'-]+$/
        : /^[a-zA-Z'-]+(?: [a-zA-Z'-]+)*$/;
    return regex.test(value)
      ? null
      : `${
          field === "firstname" ? "First" : "Last"
        } name must only contain letters, hyphens, and apostrophes${
          field === "lastname" ? ", with optional spaces between parts" : ""
        }`;
  }

  static validateUsername(value: string): FieldError {
    const regex = /^[a-zA-Z][a-zA-Z0-9]{4,9}$/;
    return regex.test(value)
      ? null
      : "Username must start with a letter, be between 5 and 10 characters long, and contain only letters and numbers";
  }

  static validateEmail(value: string): FieldError {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) ? null : "Please enter a valid email address";
  }

  static validatePassword(value: string): FieldError {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regex.test(value)) return null;

    const missingComponents = [];
    if (!/[a-z]/.test(value))
      missingComponents.push("at least one lowercase letter");
    if (!/[A-Z]/.test(value))
      missingComponents.push("at least one uppercase letter");
    if (!/[0-9]/.test(value)) missingComponents.push("at least one number");
    if (!/[@$!%*?&]/.test(value))
      missingComponents.push(
        "at least one special character (@, $, !, %, *, ?, &)"
      );

    return missingComponents.length > 0
      ? `Password must contain at least 8 characters, and ${missingComponents.join(
          " and "
        )}.`
      : "Password is too short. It must be at least 8 characters long.";
  }

  static validateConfirmPassword(
    password: string,
    confirmPassword: string
  ): FieldError {
    return password === confirmPassword ? null : "Passwords do not match";
  }

  static validateRole(value: string | undefined): FieldError {
    return value && value !== "" ? null : "You must select a role";
  }

  static validateContact(value: string): FieldError {
    const regex = /^\d{10}$/;
    return regex.test(value) ? null : "Please enter a 10-digit phone number";
  }

  static validateAddress(address: {
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  }): Record<string, FieldError> {
    const errors: Record<string, FieldError> = {
      address_line_1: this.validateRequired(
        address.address_line_1,
        "Address Line 1"
      ),
      address_line_2: this.validateOptional(address.address_line_2),
      city: this.validateRequired(address.city, "City"),
      state: this.validateRequired(address.state, "State"),
      zip_code: this.validateZipCode(address.zip_code),
      country: this.validateRequired(address.country, "Country"),
    };
    return errors;
  }

  static validateRequired(value: string, fieldName: string): FieldError {
    return value ? null : `${fieldName} is required`;
  }

  static validateOptional(value: string): FieldError {
    return null;
  }

  static validateZipCode(value: string): FieldError {
    const regex = /^\d{5}(-\d{4})?$/;
    return regex.test(value) ? null : "Please enter a valid ZIP code";
  }
}
