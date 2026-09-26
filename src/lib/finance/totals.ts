import type { QuotationLineItem } from "@/types/domain";

export function calculateLineTotal(line: QuotationLineItem): number {
  return line.quantity * line.unitPrice;
}

export function calculateQuoteTotals(lines: QuotationLineItem[]) {
  const subtotal = lines.reduce(
    (sum, line) => sum + calculateLineTotal(line),
    0
  );

  const taxTotal = lines.reduce(
    (sum, line) => sum + calculateLineTotal(line) * (line.taxRate / 100),
    0
  );

  return {
    subtotal,
    taxTotal,
    grandTotal: subtotal + taxTotal
  };
}
