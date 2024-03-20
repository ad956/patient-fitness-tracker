export function GET() {
  const commonDiseases = [
    "Common Cold",
    "Influenza (Flu)",
    "COVID-19",
    "Asthma",
    "Diabetes",
    "Heart Disease",
    "Hypertension",
    "Arthritis",
    "Migraine",
    "Allergies",
    "Bronchitis",
    "Pneumonia",
    "Gastroenteritis",
    "Urinary Tract Infection (UTI)",
    "Osteoporosis",
    "Depression",
    "Anxiety",
    "Skin Cancer",
    "Stroke",
    "Obesity",
    "Other",
  ];
  return Response.json({ commonDiseases });
}
