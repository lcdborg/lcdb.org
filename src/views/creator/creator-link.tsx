import Link from "next/link";

export default function CreatorLink(props: any) {
  const artist = props.artist;

  const pathname = '/creator/' + props.creator.id;
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
