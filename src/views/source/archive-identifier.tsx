import Link from "next/link";

export default function ArchiveIdentifier(props: any) {

  if (! props.identifier) {
    return (<></>);
  }

  return (
    <Link
      href={{
      pathname: 'https://archive.org/details/' + props.identifier
    }}>
      <a target="_blank" title={props.identifier}>
        <i className="iconochive iconochive-logo"></i>
      </a>
    </Link>
  );
}