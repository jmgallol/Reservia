// Internal imports
import type { CalculateBillSplitDTO } from '~/dtos/CalculateBillSplitDTO';
import type { BillSplitInterface } from '~/interfaces/BillSplitInterface';

export class BillSplitUtil {
  static calculate(dto: CalculateBillSplitDTO): BillSplitInterface {
    const tipAmount = dto.billAmount * (dto.tipPercentage / 100);
    const totalWithTip = dto.billAmount + tipAmount;

    return {
      tipAmount,
      totalWithTip,
      amountPerPerson: totalWithTip / dto.people,
    };
  }
}
