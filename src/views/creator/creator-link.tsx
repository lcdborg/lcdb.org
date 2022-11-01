import Link from "next/link";

export default function ArtistLink(props: any) {
  const artist = props.artist;

  const pathname = '/artist/' + props.artist.id;
  let query = {};

  if (props.year) {
    query = {year: props.year};
  }

  return (
    <Link
      href={{pathname, query}}
    >
      {artist.name}
    </Link>
  );
}
