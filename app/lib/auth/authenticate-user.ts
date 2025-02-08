import { AppError, STATUS_CODES } from "@utils/index";
import { decrypt } from "@session";
import { cookies } from "next/headers";
import { JWTExpired, JWTInvalid } from "jose/errors";

export default async function authenticateUser(): Promise<{
  id: string;
  role: string;
}> {
  const session = cookies().get("session")?.value;

  if (!session) {
    console.log("Unauthorized: No session cookie found");
    throw new AppError("Unauthorized", STATUS_CODES.UNAUTHORIZED);
  }

  try {
    const decryptedToken = await decrypt(session);

    return {
      id: decryptedToken.user.id,
      role: decryptedToken.user.role,
    };
  } catch (error) {
    console.error("Error in authentication:", error);

    if (error instanceof JWTExpired) {
      throw new AppError("Session expired", STATUS_CODES.UNAUTHORIZED);
    } else if (error instanceof JWTInvalid) {
      throw new AppError("Invalid session", STATUS_CODES.UNAUTHORIZED);
    }

    throw new AppError("Internal Server Error", STATUS_CODES.SERVER_ERROR);
  }
}
