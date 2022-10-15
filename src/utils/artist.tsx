import Link from "next/link";

export function ArtistsTable(props: any) {
  const graphql: any = props.graphql;

  if (!graphql.data || !graphql.data.artists.totalCount) {
    return (
      <div className="row">
        <div className="col-md-12">
          No results found
        </div>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-4">
        {
          graphql.data.artists.edges.slice(
            0, Math.ceil(graphql.data.artists.edges.length / 3)
          ).map((edge: any, key: any) => (
            <a className="artist-block" key={key} href={props.pathname + edge.node.id}>{edge.node.name}</a>
          ))
        }
      </div>
      <div className="col-md-4">
        {
          graphql.data.artists.edges.slice(
            Math.ceil(graphql.data.artists.edges.length / 3),
            Math.ceil(graphql.data.artists.edges.length / 3) * 2
          ).map((edge: any, key: any) => (
            <a className="artist-block" key={key} href={props.pathname + edge.node.id}>{edge.node.name}</a>
          ))
        }
      </div>
      <div className="col-md-4">
        {
          graphql.data.artists.edges.slice(
            Math.ceil(graphql.data.artists.edges.length / 3) * 2
          ).map((edge: any, key: any) => (
            <a className="artist-block" key={key} href={props.pathname + edge.node.id}>{edge.node.name}</a>
          ))
        }
      </div>
    </div>
  )
}

export function FromTo(props: any) {
  if (! props.graphql.data.artists.totalCount) {
    return (<></>)
  }

  return (
    <div>
      <Link href={{
        pathname: props.pathname + props.graphql.data.artists.edges[0].node.id
      }}>
        { props.graphql.data.artists.edges[0].node.name }
      </Link>
      &nbsp;to&nbsp;
      <Link href={{
        pathname: props.pathname + props.graphql.data.artists.edges[props.graphql.data.artists.edges.length - 1].node.id
      }}>
        { props.graphql.data.artists.edges[props.graphql.data.artists.edges.length - 1].node.name }
      </Link>
    </div>
  );
}
