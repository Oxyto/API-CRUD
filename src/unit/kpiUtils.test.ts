import { getKpiStatus } from "../kpiUtils"

test("Get a status string from a number", () => {
  expect(getKpiStatus(2)).toEqual("occasional")
  expect(getKpiStatus(5)).toEqual("regular")
  expect(getKpiStatus(20)).toEqual("VIP")
})
