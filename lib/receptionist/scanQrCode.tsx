const scanQRCode = async (data: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/receptionist/scan", {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const msg = await res.json();
    return msg;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default scanQRCode;
