export const getLocationName = async (
  lat: number,
  lon: number
): Promise<string | null> => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    const res = await fetch(url);

    const data = await res.json();

    return data.address.municipality;
  } catch (error) {
    console.log(error);
    return null;
  }
};
