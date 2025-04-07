"use server"

import { promises as fs } from "fs";

export const getData = async function(filePath) {
  const data = await fs.readFile(process.cwd() + filePath, 'utf8');
  
  return JSON.parse(data);
}

export default getData;