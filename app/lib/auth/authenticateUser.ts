import { AppError, STATUS_CODES } from "@utils/index";
import { decrypt } from "@sessions/sessionUtils";
import { JWTExpired, JWTInvalid } from "jose/errors";

export async function authenticateUser(
  authHeader: string | null
): Promise<{ id: string; role: string }> {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Unauthorized", STATUS_CODES.UNAUTHORIZED);
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decryptedToken = await decrypt(token);
    return {
      id: decryptedToken.user.id,
      role: decryptedToken.user.role,
    };
  } catch (error) {
    console.error("Error in authentication:", error);

    if (error instanceof JWTExpired) {
      throw new AppError("Token expired", STATUS_CODES.UNAUTHORIZED);
    } else if (error instanceof JWTInvalid) {
      throw new AppError("Invalid token", STATUS_CODES.UNAUTHORIZED);
    }
    throw new AppError("Internal dfdfgv Error", STATUS_CODES.SERVER_ERROR);
  }
}
