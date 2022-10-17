import Link from "next/link";

export default function SourceLink(props: any) {
  const source = props.source;

  console.log(source);

  return (
    <Link href={{
      pathname: '/source/' + source.id
    }}>
      {String(source.id)}
    </Link>
  );
}

