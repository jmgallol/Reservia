export default class JsonParserUtil {
  static parse(data: unknown): unknown {
    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    return data;
  }
}
