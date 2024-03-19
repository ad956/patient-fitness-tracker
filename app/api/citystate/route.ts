import data from "./data.json";

export async function GET() {
  try {
    // const response = await fetch(
    //   `http://localhost:3000/api/citystate`
    // );

    // if (!response.ok) {
    //   throw new Error(`Failed to fetch data: ${response.statusText}`);
    // }

    // const data = await response.json();
    // const states = data.results
    //   .filter((result: any) => result.components.country === "India")
    //   .map((result: any) => result.components.state);
    // const statesAndCities = data.results.map((result: any) => {
    //   const state = result.components.state;
    //   const city = result.components.city;
    //   return { state, city };
    // });

    // return Response.json(states);
    return Response.json(data);
    // return Response.json(statesAndCities);
  } catch (error) {
    console.error("Error fetching state and city data:", error);
    return Response.json({ error: "Internal Server Error" });
  }
}
