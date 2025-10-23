import type { SpellDetails } from "../../util/fetchSpellDetails";

type SizeClass = 'nano' | 'micro' | 'mini' | 'mid';

export function getSizeClass({ desc, higher_level, casting_time, material }: SpellDetails): SizeClass {
  const paragraphs = [...desc, ...higher_level || []];
  const totalLength = paragraphs.reduce((wc, p) => wc + p.length, (material?.length || 0) + casting_time.length);

  if (totalLength > 1500) return 'nano';
  if (totalLength > 950) return 'micro';
  if (totalLength > 550) return 'mini';
  return 'mid';
}

export function formatParagraph(text: string): string {
  return text.replace(
    /(\*\*\*(.*)\*\*\*|[Ss]trength|[Dd]exterity|[Cc]onstitution|[Ii]ntelligence|[Ww]isdom|[Cc]harisma|\d+d\d+( \+ \d+)?)/g,
    '<strong>$1</strong>'
  );
}