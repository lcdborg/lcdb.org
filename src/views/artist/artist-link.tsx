import Link from "next/link";

export default function ArtistLink(props: any) {
  const pathname = '/artist/' + props.artist.id;
  let query = {};

  if (props.year) {
    query = {year: props.year};
  }

  return (
    <Link
      href={{pathname, query}}
    >
      {props.artist.name}
    </Link>
  );
}
