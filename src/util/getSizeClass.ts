import type { SpellDetails } from "../util/fetchSpellDetails";

export type SizeClass = 'nano' | 'micro' | 'mini' | 'mid';

export function getSizeClass(paragraphs: string[] = []): SizeClass {
  const paragraphLength = paragraphs.reduce((wc, p) => wc + p.length, 0);
  const paragraphGapLength = paragraphs.length * 30;
  const totalLength = paragraphLength + paragraphGapLength;

  if (totalLength > 1500) return 'nano';
  if (totalLength > 950) return 'micro';
  if (totalLength > 550) return 'mini';
  return 'mid';
}

export function getSpellSizeClass({ desc, higher_level, casting_time, material }: SpellDetails): SizeClass {
  const paragraphs = [...desc, ...higher_level || []];
  const paragraphLength = paragraphs.reduce((wc, p) => wc + p.length, 0);
  const paragraphGapLength = paragraphs.length * 30;
  const totalLength = paragraphLength + paragraphGapLength + casting_time.length + (material ? material.length : 0);

  if (totalLength > 1500) return 'nano';
  if (totalLength > 950) return 'micro';
  if (totalLength > 550) return 'mini';
  return 'mid';
}
