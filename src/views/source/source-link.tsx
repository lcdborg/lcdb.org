import Link from "next/link";

export default function SourceLink(props: any) {
  const source = props.source;

  if (! source || source.id === null) {
    return (<></>);
  }

  const title = source.comments || '';

  return (
    <Link
      href={{ pathname: '/source/' + source.id}}
    >
      <a title={title}>
        {String(source.id)}
      </a>
    </Link>
  );
}

