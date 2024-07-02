// const createOrderId = async (amount: string) => {
//   try {
//     const response = await fetch("/api/payment/create-order", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         amount: parseFloat(amount) * 100,
//         currency: "INR",
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     return data.orderId;
//   } catch (error) {
//     console.error("There was a problem with your fetch operation:", error);
//   }
// };

// export default createOrderId;
