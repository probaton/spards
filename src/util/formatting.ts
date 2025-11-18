export function capitalizeFirstLetter(txt: string): string {
  return `${txt[0].toUpperCase()}${txt.slice(1)}`;
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
