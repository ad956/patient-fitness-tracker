import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    paramsToSign: Record<string, string>;
  };
  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string
  );

  return Response.json({ signature });
}
