export async function getPatientData() {
  const res = await fetch(`http://localhost:3000/api/patient`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) throw new Error("Fetching Single User failed");

  // used when working with dynamicParams and notFound() from next/navigation
  // if (!res.ok) return undefined;
  return res.json();
}
