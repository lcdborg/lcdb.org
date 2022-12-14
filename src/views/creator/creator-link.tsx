import Link from "next/link";

export default function CreatorLink(props: any) {
  const pathname = '/creator/' + props.creator.id;
  let query = {};

  if (props.year) {
    query = {year: props.year};
  }

  return (
    <Link
      href={{pathname, query}}
    >
      {props.creator.name}
    </Link>
  );
}
