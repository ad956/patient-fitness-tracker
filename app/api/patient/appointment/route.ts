type appointmentBody = {
  state: string;
  city: string;
  hospital: string;
  disease: string;
  note: string;
};

export function GET() {
  return Response.json({ msg: "is it working" });
}
export async function POST(req: Request) {
  const body: appointmentBody = await req.json();

  const { state, city, hospital, disease, note } = body;

  const data = { state, city, hospital, disease, note };
  console.log("Received appointment request:");
  console.log("State:", state);
  console.log("City:", city);
  console.log("Hospital:", hospital);
  console.log("Disease:", disease);
  console.log("Note:", note);

  return Response.json({ msg: "ok", data });
}
