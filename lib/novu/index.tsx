import { Novu } from "@novu/node";

export default async function sendNotification(subscriberId: string) {
  try {
    const novu = new Novu(process.env.NOVU_API_KEY || "");

    await novu.subscribers.identify(subscriberId, {});

    novu.trigger("pft", {
      to: {
        subscriberId,
      },
      actor: "https://media.tenor.com/iwXHwlY31ecAAAAM/yuji-itadori-suku.gif",
      payload: {},
    });

    return subscriberId;
  } catch (error) {
    console.error("Error sending notification :", error);
    throw error;
  }
}
