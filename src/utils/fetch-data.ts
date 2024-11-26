export async function fetchData<T>(filePath: string): Promise<T> {
  const response = await fetch(filePath);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${filePath}`);
  }
  return response.json();
}
