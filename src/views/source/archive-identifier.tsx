import Link from "next/link";

export default function ArchiveIdentifier(props: any) {

  if (! props.identifier) {
    return (<></>);
  }

  return (
    <Link
      href={{
      pathname: '/identifier/' + props.identifier
    }}>
      <a title={props.identifier}>
        <i className="iconochive iconochive-logo"></i>
      </a>
    </Link>
  );
}