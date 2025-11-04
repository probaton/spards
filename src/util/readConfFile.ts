import { promises as fs } from 'fs';
import * as path from 'path';

async function getRootDirectory(currentDirectory: string): Promise<string> {
  const packageJsonPath = path.join(currentDirectory, 'package.json');
  if (await fileExists(packageJsonPath)) {
    return currentDirectory;
  }

  return getRootDirectory(path.dirname(currentDirectory));
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    return await (fs.access(filePath)) === undefined;
  } catch (e: unknown) {
    if (e instanceof Error && 'code' in e && e.code === 'ENOENT') return false;
    throw e;
  }
}

async function readConfFilePath(filePath: string): Promise<string[]> {
  return (await fs.readFile(filePath, 'utf-8')).split('\n').filter(l => !l.startsWith('//') && l.trim() !== '');
}

export async function readConfFile(fileName: string): Promise<string[]> {
  const confDir = `${await getRootDirectory(import.meta.url)}/conf`;
  const fullPath = `${confDir}/${fileName}.conf`;

  return await fileExists(fullPath)
    ? readConfFilePath(fullPath)
    : readConfFilePath(`${confDir}/example.${fileName}.conf`);
}