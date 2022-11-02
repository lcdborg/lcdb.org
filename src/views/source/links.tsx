import Link from "next/link";
import ArchiveIdentifier from "./archive-identifier";

export const Links = (props: any) => {
  const links: any[] = [];

  props.edges.map((edge: any, key: any) => {
    if (edge.node.archiveIdentifier) {
      links.push((
        <ArchiveIdentifier
          key={key + 'ai'}
          identifier={edge.node.archiveIdentifier}></ArchiveIdentifier>
      ));
    }

    links.push((
      <Link
        href={{
          pathname: '/source/' + edge.node.id
        }}
        key={key}
      >
        <a className="source-link" title={edge.node.comments}>
          {edge.node.id}
        </a>
      </Link>
    ));
  });

  return (
    <>
      {links}
    </>
  );
}
