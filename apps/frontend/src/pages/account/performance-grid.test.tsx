import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { MetricDisplayProps } from "@/components/metric-display";
import type { PerformanceResult } from "@/lib/types";

import { PerformanceGrid } from "./performance-grid";

vi.mock("@/components/metric-display", () => ({
  HOLDINGS_MODE_MAX_DRAWDOWN_INFO: "holdings max drawdown",
  HOLDINGS_MODE_VOLATILITY_INFO: "holdings volatility",
  IRR_RETURN_INFO: "irr",
  MAX_DRAWDOWN_INFO: "max drawdown",
  TIME_WEIGHTED_RETURN_INFO: "twr",
  VALUE_RETURN_INFO: "value return",
  VOLATILITY_INFO: "volatility",
  MetricDisplay: ({ label, value, emptyReason }: MetricDisplayProps) => (
    <div data-testid={`metric-${label}`}>
      {label}:{value ?? "N/A"}:{emptyReason ?? ""}
    </div>
  ),
}));

function performanceResult(overrides: Partial<PerformanceResult> = {}): PerformanceResult {
  return {
    scope: { id: "account-1", currency: "USD" },
    period: { startDate: "2026-06-01", endDate: "2026-06-30" },
    mode: "valueReturn",
    returns: {
      twr: null,
      annualizedTwr: null,
      irr: null,
      annualizedIrr: null,
      valueReturn: 0.42,
      annualizedValueReturn: null,
    },
    attribution: {
      contributions: 0,
      distributions: 0,
      income: 0,
      realizedPnl: 0,
      unrealizedPnlChange: 0,
      fxEffect: 0,
      fees: 0,
      taxes: 0,
      residual: 0,
    },
    risk: { volatility: null, maxDrawdown: null },
    dataQuality: {
      status: "partial",
      warnings: [],
      notApplicableReasons: ["Book basis is incomplete."],
    },
    basisStatus: "partialUnknown",
    summary: {
      amount: null,
      percent: null,
      method: "valueReturn",
      basis: "bookBasis",
      quality: "partial",
      amountStatus: "unavailable",
      percentStatus: "unavailable",
      basisStatus: "partialUnknown",
      reasons: ["Book basis is incomplete."],
    },
    series: [],
    isHoldingsMode: true,
    ...overrides,
  };
}

describe("PerformanceGrid", () => {
  it("does not show raw holdings value return when summary percent is unavailable", () => {
    render(<PerformanceGrid performance={performanceResult()} isHoldingsMode />);

    expect(screen.getByTestId("metric-Value Return")).toHaveTextContent(
      "Value Return:N/A:Book basis is incomplete.",
    );
  });
});
