import Link from "next/link";

export default function UserPerformanceLink(props: any) {
  const userPerformance = props.userPerformance;

  if (! userPerformance || userPerformance.id === null) {
    return (<></>);
  }

  return (
    <Link
      href={{ pathname: '/user-performance/' + userPerformance.id}}
    >
        {String(userPerformance.id)}
    </Link>
  );
}

