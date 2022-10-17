import ArtistLink from "../artist/artist-link";
import { PerformanceLink } from "../performance/performance-link";
import { Links as SourceLinks } from "../source/links";
import { Grid } from '@mui/material';

export default function PerformanceListTable(props: any) {
  const rows: any[] = [];

  props.graphql.data.performances.edges.map((edge: any, key: any) => {
    rows.push((
      <tr key={key + "1"}>
        <td>
          <ArtistLink artist={edge.node.artist}></ArtistLink>
        </td>
        <td>
          <PerformanceLink performance={edge.node}></PerformanceLink>
        </td>
        <td>{edge.node.venue}</td>
        <td>{edge.node.city}</td>
        <td>{edge.node.state}</td>
        <td>
          <SourceLinks edges={edge.node.sources.edges}></SourceLinks>
        </td>
      </tr>
    ));

    if (props.showSets) {
      rows.push((
        <tr key={key + "2"}>
          <td colSpan={6}>
            <Grid container spacing={6}>
              <Grid item xs={3} md={3}>
                <b>Set 1</b>
                <br />
                {edge.node.set1}
              </Grid>
              <Grid item xs={3} md={3}>
                <b>Set 2</b>
                <br />
                {edge.node.set2}
              </Grid>
              <Grid item xs={3} md={3}>
                <b>Set 3</b>
                <br />
                {edge.node.set3}
              </Grid>
              <Grid item xs={3} md={3}>
                <b>Comment</b>
                <br />
                {edge.node.comment}
              </Grid>
            </Grid>
          </td>
        </tr>
      ))
    }
  });

  return (
    <table width="100%" className="table table-striped">
      <thead>
        <tr>
          <th>Artist</th>
          <th>Date</th>
          <th>Venue</th>
          <th>City</th>
          <th>State</th>
          <th>Sources</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
