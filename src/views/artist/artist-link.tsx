import Link from "next/link";

export default function ArtistLink(props: any) {
  const artist = props.artist;

  return (
    <Link
      href={{
        pathname: '/artist/' + artist.id
      }}
    >
      {artist.name}
    </Link>
  );
}
