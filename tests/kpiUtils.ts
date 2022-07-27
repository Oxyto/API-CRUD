export function getKpiStatus(numberPurchase: number): string {
  if (numberPurchase < 4) return "occasional"
  if (numberPurchase < 10) return "regular"
  return "VIP"
}
