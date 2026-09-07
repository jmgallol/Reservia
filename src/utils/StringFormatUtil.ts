export class StringFormatUtil {
  static getInitials(name: string): string {
    return name
      .trim()
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  }

  static normalizeSearchText(text: string): string {
    return text
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  static formatReviewStatus(status?: string): string {
    const labels: Record<string, string> = {
      approved: 'Aprobada',
      pending: 'Pendiente',
      rejected: 'Rechazada',
    };

    return status ? labels[status] ?? status : '';
  }
}
