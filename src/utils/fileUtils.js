import fs from 'fs/promises';
import path from 'path';

export const ensureDir = async (dirPath) => {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
};

export const readJson = async (filePath) => {
  try {
    await ensureDir(path.dirname(filePath));
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch {
    return [];
  }
};

export const writeJson = async (filePath, data) => {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
};