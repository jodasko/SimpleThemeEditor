export const getData = async () => {
  try {
    const response = await fetch("/data/data.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching theme data: ", error);
    return null;
  }
};
