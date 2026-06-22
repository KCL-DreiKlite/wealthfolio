import type { PerformanceResult } from "@/lib/types";

const numberOrNull = (value: number | null | undefined): number | null =>
  value == null || !Number.isFinite(Number(value)) ? null : Number(value);

export function performancePeriodPnl(result: PerformanceResult | null | undefined): number | null {
  if (!result || result.summary?.amountStatus !== "complete") return null;
  return numberOrNull(result.summary.amount);
}

export function performanceSummaryReturn(
  result: PerformanceResult | null | undefined,
): number | null {
  if (!result || result.summary?.percentStatus !== "complete") return null;
  return numberOrNull(result.summary.percent);
}
