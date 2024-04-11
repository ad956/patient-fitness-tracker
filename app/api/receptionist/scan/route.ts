export async function POST(req: Request) {
  const reqBody = req.json();
  try {
    return Response.json(
      { message: "Successfully scanned QR" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error scanning patient qr code :", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
