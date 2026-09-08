export class DateFormatUtil {
  static formatDate(value: string): string {
    return value;
  }

  static formatReviewDate(reviewDate?: string): string {
    if (!reviewDate) return '';

    const date = new Date(reviewDate);
    if (Number.isNaN(date.getTime())) return reviewDate;

    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  }

  static parseDate(value: string): Date | null {
    if (value.toLowerCase() === 'hoy') {
      return new Date();
    }
    if (value.toLowerCase() === 'mañana' || value.toLowerCase() === 'manana') {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      return tomorrow;
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return null;

    return date;
  }

  static formatShortDate(value?: string): string {
    if (!value) return '';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
