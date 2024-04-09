export async function getReceptionistData() {
  const res = await fetch(`http://localhost:3000/api/receptionist`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    console.error(`Error fetching receptionist data: ${res.statusText}`);
    throw new Error("Failed to fetch receptionist data");
  }

  const receptionistData = await res.json();
  console.log("data ia here  : " + receptionistData.firstname);

  return receptionistData;
}
