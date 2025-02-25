import { readFileSync } from "fs";
import { join } from "path";

export function readJsonFile(file: string) {
  const filePath = join(process.cwd(), `public/data/${file}.json`);

  const data = readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}