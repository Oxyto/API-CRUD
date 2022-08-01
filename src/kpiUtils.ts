import { StatusEnum } from "./models"

export function getKpiStatus(numberPurchase: number): StatusEnum {
  if (numberPurchase < 4) return StatusEnum.occasional
  if (numberPurchase < 10) return StatusEnum.regular
  return StatusEnum.VIP
}
