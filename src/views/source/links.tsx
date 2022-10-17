import Link from "next/link";

export const Links = (props: any) => {
  const links: any[] = [];

  props.edges.map((edge: any, key: any) => {
    if (edge.node.archiveIdentifier) {
      links.push((
        <Link
          key={key + 'ai'}
          href={{
            pathname: 'https://archive.org/details/' + edge.node.archiveIdentifier
          }}>
            <a target="_blank" title={edge.node.archiveIdentifier}>
              <i className="iconochive iconochive-logo"></i>
            </a>
        </Link>
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
