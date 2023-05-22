import { Grid } from "@mui/material";
import ArtistLink from "../artist/artist-link";
import { PerformanceLink } from "../performance/performance-link";
import SourceLink from "../source/source-link";

export default function ArtistsTable(props: any) {
  const graphql: any = props.graphql;

  if (!graphql.data || !graphql.data.userListPerformances.totalCount) {
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
      <Grid item md={1}>
        Date
      </Grid>
      <Grid item md={3}>
        Artist
      </Grid>
      <Grid item md={1}>
        Source
      </Grid>
      <Grid item md={4}>
        Source Comment
      </Grid>

      {
        graphql.data.userListPerformances.edges.map((edge: any, key: any) => (
          <Grid container key={key}>
            <Grid md={1}>
              <PerformanceLink performance={edge.node.performance}></PerformanceLink>
            </Grid>
            <Grid md={3}>
              <ArtistLink artist={edge.node.performance.artist} year={edge.node.performance.year}></ArtistLink>
            </Grid>
            <Grid md={1}>
              <SourceLink source={edge.node.source}></SourceLink>
            </Grid>
            <Grid md={4}>
              { edge.node.source && edge.node.source.comments || " "}
            </Grid>
            <hr />
          </Grid>
        ))
      }
    </Grid>
  )
}
