import type { SpellDetails } from "../../util/fetchSpellDetails";

export type SizeClass = 'nano' | 'micro' | 'mini' | 'mid';

export function getSizeClass({ desc, higher_level, casting_time, material }: SpellDetails): SizeClass {
  const paragraphs = [...desc, ...higher_level || []];
  const paragraphLength = paragraphs.reduce((wc, p) => wc + p.length, 0);
  const paragraphGapLength = paragraphs.length * 30;
  const totalLength = paragraphLength + paragraphGapLength + casting_time.length + (material ? material.length : 0);

  if (totalLength > 1500) return 'nano';
  if (totalLength > 950) return 'micro';
  if (totalLength > 550) return 'mini';
  return 'mid';
}

export function formatParagraph(text: string, title?: string): string {
  const content = text
    .replace(
      /([Ss]trength|[Dd]exterity|[Cc]onstitution|[Ii]ntelligence|[Ww]isdom|[Cc]harisma|\d+d\d+( ?\+ ?\d+)?)/g,
      '<strong>$1</strong>'
    ).replace(
      /\*\*\*(.*)\*\*\*/g,
      '<strong>$1</strong>'
    );
  return title ? `<strong>${title}</strong>: ${content}` : content;
}