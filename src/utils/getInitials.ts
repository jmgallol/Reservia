export function getInitials(name: string): string {
  return name
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}
