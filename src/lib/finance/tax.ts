export interface TaxInput {
  subtotal: number;
  gstRate?: number;
  tdsRate?: number;
  withholdingRate?: number;
  reverseCharge?: boolean;
}

export function calculateTaxes(input: TaxInput) {
  const gst = input.reverseCharge
    ? 0
    : input.subtotal * ((input.gstRate ?? 0) / 100);

  const tds = input.subtotal * ((input.tdsRate ?? 0) / 100);

  const withholding =
    input.subtotal * ((input.withholdingRate ?? 0) / 100);

  return {
    gst,
    tds,
    withholding,
    totalTax: gst,
    netReceivable: input.subtotal + gst - tds - withholding
  };
}
