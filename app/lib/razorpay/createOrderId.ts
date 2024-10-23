import toast from "react-hot-toast";

const createOrderId = async (amount: string) => {
  try {
    const response = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: parseFloat(amount) * 100,
        currency: "INR",
      }),
    });

    if (!response.ok) {
      throw new Error("Order id creation response was not ok");
    }

    const data = await response.json();
    return data.orderId;
  } catch (error) {
    console.error("There was a problem with creating order id: ", error);
    toast.error("Order id creation failed");
  }
};

export default createOrderId;
