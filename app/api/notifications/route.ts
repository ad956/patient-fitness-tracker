import { Novu } from "@novu/node";

type notificationBody = {
  subscriberId: string;
};

export async function POST(req: Request) {
  const session = req.headers.get("Authorization");
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { subscriberId }: { subscriberId: string } = await req.json();

    const novu = new Novu(process.env.NOVU_API_KEY || "");

    await novu.subscribers.identify(subscriberId, {});

    novu.trigger("pft", {
      to: {
        subscriberId,
      },
      actor: "https://media.tenor.com/iwXHwlY31ecAAAAM/yuji-itadori-suku.gif",
      payload: {},
    });

    return Response.json(subscriberId);
  } catch (error) {
    console.error("Error sending notification :", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
