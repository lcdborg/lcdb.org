import { Grid } from "@mui/material";
import Link from "next/link";

export default function ArtistsTable(props: any) {
  const graphql: any = props.graphql;

  if (!graphql.data || !graphql.data.artists.totalCount) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          No results found
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item xs={4} md={4}>
        <ul>
        {
          graphql.data.artists.edges.slice(
            0, Math.ceil(graphql.data.artists.edges.length / 3)
          ).map((edge: any, key: any) => (
            <Link key={key} href={props.pathname + edge.node.id}>
              <a className="artist-block">{edge.node.name}</a>
            </Link>
          ))
        }
        </ul>
      </Grid>
      <Grid item xs={4} md={4}>
        <ul>
        {
          graphql.data.artists.edges.slice(
            Math.ceil(graphql.data.artists.edges.length / 3),
            Math.ceil(graphql.data.artists.edges.length / 3) * 2
          ).map((edge: any, key: any) => (
            <Link key={key} href={props.pathname + edge.node.id}>
              <a className="artist-block">{edge.node.name}</a>
            </Link>
          ))
        }
        </ul>
      </Grid>
      <Grid item xs={4} md={4}>
        <ul>
        {
          graphql.data.artists.edges.slice(
            Math.ceil(graphql.data.artists.edges.length / 3) * 2
          ).map((edge: any, key: any) => (
            <Link key={key} href={props.pathname + edge.node.id}>
              <a className="artist-block">{edge.node.name}</a>
            </Link>
          ))
        }
        </ul>
      </Grid>
    </Grid>
  )
}
