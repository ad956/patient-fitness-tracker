export async function getReceptionistData() {
  const res = await fetch(`http://localhost:3000/api/receptionist`, {
    cache: "no-cache",
    // next: { revalidate: 10 },
  });

  if (!res.ok) {
    console.error(`Error fetching receptionist data: ${res.status}`);
    // throw new Error("Failed to fetch receptionist data");
  }

  const receptionistData = await res.json();

  console.log(receptionistData);

  return receptionistData;
}
