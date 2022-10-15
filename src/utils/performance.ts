export function formatPerformanceDate(performance: any) {
  return performance.year
    + '-' // '&#x2011;' // non-breaking dash
    + performance.date.slice(0, 2)
    + '-' // '&#x2011;' // non-breaking dash
    + performance.date.slice(3, 5);
}