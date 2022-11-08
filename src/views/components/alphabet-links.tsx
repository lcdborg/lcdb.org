import Link from "next/link";

function alphabet(caps = false): string[] {
  const alphabet: string[] = [];
  const offset = (caps) ? 65 : 97;

  for (let i = 0; i < 26; i++) {
    alphabet.push(String.fromCharCode(i + offset));
  }

  return alphabet;
}

export default function AlphabetLinks(props: any) {
  const links: any = [];

  alphabet(true).map((chr, key) => links.push(
    <>
      <Link
        href={{
          pathname: props.pathname,
          query: {chr}
        }}
        key={key}
      ><a className="alphabet">{chr}</a></Link>
      {' '}
    </>
  ));

  return (
    <>
      {links}
    </>
  )
}