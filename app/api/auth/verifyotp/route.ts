import dbConfig from "@lib/db";

type bodyType = {
  email: string;
  otp: string;
  role: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.otp) {
      return Response.json({ error: "OTP Not Provided" });
    }

    switch (body.role) {
      case "patient":
        return checkOTP(body);
      case "hospital":
        return checkOTP(body);
      case "doctor":
        return checkOTP(body);
      case "receptionist":
        return checkOTP(body);

      default:
        return Response.json({ error: "Invalid user" });
    }
  } catch (error) {
    console.error("Error during otp verification:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}
async function checkOTP(body: bodyType) {
  const db = await dbConfig();

  const collection = db.collection(body.role);
  const email = body.email;

  const projection = {
    _id: 0,
    otp: 1,
  };

  const userOTP = await collection.findOne({ email }, { projection });

  if (!userOTP || userOTP.otp !== body.otp)
    return Response.json({ error: "OTP Verification Failed" });

  await collection.updateOne({ email }, { $set: { otp: "" } });

  return Response.json({ message: "ok" }, { status: 200 });
}
