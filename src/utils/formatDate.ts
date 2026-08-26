export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
