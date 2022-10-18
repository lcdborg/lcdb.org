export default function PerformanceDate(props: any) {
  const performance = props.performance;
  const performanceDate = performance.year
    + '-'
    + performance.date.slice(0, 2)
    + '-'
    + performance.date.slice(3, 5);

  return (
    <>
      {performanceDate}
    </>
  )
}
