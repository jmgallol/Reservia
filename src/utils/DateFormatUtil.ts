export class DateFormatUtil {
  static formatDate(value: string): string {
    return value;
  }

  static parseDate(value: string): Date | null {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

    const date = new Date(`${value}T00:00:00`);
    if (Number.isNaN(date.getTime())) return null;

    return date;
  }
}
