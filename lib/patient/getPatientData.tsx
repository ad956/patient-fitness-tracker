export async function getPatientData() {
  const res = await fetch(`http://localhost:3000/api/patient`, {
    next: { revalidate: 10 },
    // cache: "no-store",
  });

  if (!res.ok) {
    console.error(`Error fetching patient data: ${res.statusText}`);
    throw new Error("Failed to fetch patient data");
  }

  const patientData = await res.json();
  return patientData;
}
