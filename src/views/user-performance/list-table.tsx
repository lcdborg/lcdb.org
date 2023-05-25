import { Grid } from "@mui/material";
import ArtistLink from "../artist/artist-link";
import { PerformanceLink } from "../performance/performance-link";
import SourceLink from "../source/source-link";
import UserPerformanceLink from "./user-performance-link";

export default function ArtistsTable(props: any) {
  const graphql: any = props.graphql;

  if (!graphql.data || !graphql.data.userPerformances.totalCount) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          No results found
        </Grid>
      </Grid>
    );
  }

  return (
    <table width="100%" className="table table-striped">
      <thead>
        <tr>
          <th>Details</th>
          <th>Date</th>
          <th>Artist</th>
          <th>SHNID</th>
        </tr>
      </thead>
      <tbody>
      {
        graphql.data.userPerformances.edges.map((edge: any, key: any) => (
          <>
            <tr key={key}>
              <td>
                <UserPerformanceLink userPerformance={edge.node}></UserPerformanceLink>
              </td>
              <td>
                <PerformanceLink performance={edge.node.performance}></PerformanceLink>
              </td>
              <td>
                <ArtistLink artist={edge.node.performance.artist} year={edge.node.performance.year}></ArtistLink>
              </td>
              <td>
                <SourceLink source={edge.node.source}></SourceLink>
              </td>
            </tr>
          </>
        ))
      }
      </tbody>
    </table>
  )
}
