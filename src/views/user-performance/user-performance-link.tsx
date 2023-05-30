import Link from "next/link";

export default function UserPerformanceLink(props: any) {
  const userPerformance = props.userPerformance;
  const performance = props.userPerformance.performance;

  const performanceDate = performance.year
    + '-'
    + performance.date.slice(0, 2)
    + '-'
    + performance.date.slice(3, 5);

  if (! userPerformance || userPerformance.id === null) {
    return (<></>);
  }

  return (
    <Link
      href={{ pathname: '/user-performance/' + userPerformance.id}}
    >
      {performanceDate}
    </Link>
  );
}

