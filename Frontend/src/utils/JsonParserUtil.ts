export default class JsonParserUtil {
  static parse(data: unknown): any {
    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    return data;
  }
}
