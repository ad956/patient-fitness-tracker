import { NextRequest } from "next/server";
import { razorpay } from "@lib/razorpay";

export async function POST(request: NextRequest) {
  const { amount, currency } = (await request.json()) as {
    amount: string;
    currency: string;
  };

  var options = {
    amount: amount,
    currency: currency,
    receipt: "rcp1",
  };
  const order = await razorpay.orders.create(options);
  console.log(order);
  return Response.json({ orderId: order.id }, { status: 200 });
}
