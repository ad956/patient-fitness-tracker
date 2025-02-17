import { Novu } from "@novu/node";

export default async function sendNotification(
  subscriberId: string,
  message: string,
  type: string
) {
  try {
    const novu = new Novu(process.env.NOVU_API_KEY || "");

    await novu.subscribers.identify(subscriberId, {});

    novu.trigger("syncure", {
      to: {
        subscriberId,
      },
      payload: {
        message,
        type,
      },
    });

    return subscriberId;
  } catch (error) {
    console.error("Error sending notification :", error);
    throw error;
  }
}
