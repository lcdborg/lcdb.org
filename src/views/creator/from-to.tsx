import Link from "next/link";

export default function FromTo(props: any) {
  if (! props.graphql.data.creators.totalCount) {
    return (<></>)
  }

  return (
    <div>
      <Link href={{
        pathname: props.pathname + props.graphql.data.creators.edges[0].node.id
      }}>
        { props.graphql.data.creators.edges[0].node.name }
      </Link>
      &nbsp;to&nbsp;
      <Link href={{
        pathname: props.pathname + props.graphql.data.creators.edges[props.graphql.data.creators.edges.length - 1].node.id
      }}>
        { props.graphql.data.creators.edges[props.graphql.data.creators.edges.length - 1].node.name }
      </Link>
    </div>
  );
}
