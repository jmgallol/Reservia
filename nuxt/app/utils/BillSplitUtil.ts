export class BillSplitUtil {
  static calculate(params: { billAmount: number; tipPercentage: number; people: number }) {
    const tipAmount = params.billAmount * (params.tipPercentage / 100);
    const totalWithTip = params.billAmount + tipAmount;

    return {
      tipAmount,
      totalWithTip,
      amountPerPerson: totalWithTip / params.people,
    };
  }
}
