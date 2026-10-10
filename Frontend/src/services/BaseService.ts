// External imports
import axios, { AxiosError } from 'axios';
import type { Method } from 'axios';

// Internal imports
import JsonParserUtil from '@/utils/JsonParserUtil';

export abstract class BaseService {
  protected static async makeRequest<T = unknown>(
    url: string,
    useJsonParser: boolean = false,
    method: Method = 'get',
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<T> {
    try {
      const response = await axios({ url, method, data: body, headers });

      if (useJsonParser) {
        return JsonParserUtil.parse(response.data) as T;
      }

      return response.data as T;
    } catch (error) {
      throw BaseService.toError(error);
    }
  }

  protected static async makeRequestFile(
    url: string,
    method: Method = 'get',
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<unknown> {
    try {
      const response = await axios({ url, method, data: body, headers, responseType: 'blob' });
      return response.data;
    } catch (error) {
      throw BaseService.toError(error);
    }
  }

  private static toError(error: unknown): Error {
    const isAxios =
      axios.isAxiosError(error) || (error && typeof error === 'object' && 'isAxiosError' in error);

    if (isAxios) {
      const axiosError = error as AxiosError<{ message?: string | string[]; error?: string }>;
      if (axiosError.code === 'ERR_NETWORK' || axiosError.message === 'Network Error') {
        return new Error(
          'El servidor no está disponible en este momento. Por favor, intenta más tarde.',
        );
      }

      const responseData = axiosError.response?.data;
      let backendMessage: string | string[] | undefined =
        responseData?.message || responseData?.error || axiosError.message;

      if (Array.isArray(backendMessage)) {
        backendMessage = backendMessage[0];
      }

      return new Error(backendMessage || 'Ocurrió un error inesperado.');
    }

    return error instanceof Error ? error : new Error(String(error));
  }
}
