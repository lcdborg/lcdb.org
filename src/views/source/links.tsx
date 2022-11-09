import Link from "next/link";

export const Links = (props: any) => {
  const links: any[] = [];

  props.edges.map((edge: any, key: any) => {
    links.push((
      <>
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
        {' '}
      </>
    ));
  });

  return (
    <>
      {links}
    </>
  );
}
