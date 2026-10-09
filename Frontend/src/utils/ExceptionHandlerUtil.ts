export default class ExceptionHandlerUtil {
  static async handleWithModal<T>(
    operation: () => Promise<T>,
    modalRef: any,
    successMessage: string = '',
    errorMessage: string = '',
  ): Promise<T | undefined> {
    try {
      const response = await operation();
      if (successMessage) {
        modalRef.value?.modifyMessage(successMessage, 'success');
      }
      return response;
    } catch (error: any) {
      if (errorMessage) {
        modalRef.value?.modifyMessage(errorMessage, 'error');
      } else {
        const errorMessage = error instanceof Error ? error.message : String(error);
        modalRef.value?.modifyMessage(errorMessage, 'error');
        return undefined;
      }
    }
  }
}
