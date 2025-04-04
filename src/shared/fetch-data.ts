import { Property } from "../models";

const DATA_URL = `/data/properties.json`;

export async function fetchProperties(): Promise<Property[]> {
  try {
    const response = await fetch(DATA_URL);

    if (!response) {
      throw new Error("Error during fetching data");
    }

    return await response.json();
  } catch (error: unknown) {
    console.error((error as Error).message);
    return [];
  }
}
