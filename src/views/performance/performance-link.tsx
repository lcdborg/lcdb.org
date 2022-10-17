import Link from "next/link";

export function PerformanceLink(props: any) {
  const performance = props.performance;
  const performanceDate = performance.year
    + '-'
    + performance.date.slice(0, 2)
    + '-'
    + performance.date.slice(3, 5);

  return (
    <Link
      href={{
        pathname: '/performance/' + performance.id
      }}
    >
      <a className="performance-link">
        {performanceDate}
      </a>
    </Link>
  )
}
