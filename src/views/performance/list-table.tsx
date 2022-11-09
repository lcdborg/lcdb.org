import { Links as SourceLinks } from "../source/links";
import { PerformanceLink } from "./performance-link";
import { Grid } from "@mui/material";

export default function ListTable(props: any) {
  const rows: any[] = [];

  props.graphql.data.artist.performances.edges.map((edge: any, key: any) => {
    rows.push((
      <>
        <tr key={key + "a"}>
          <td>
            <PerformanceLink performance={edge.node}></PerformanceLink>
          </td>
          <td>{edge.node.venue}</td>
          <td>{edge.node.city}</td>
          <td>{edge.node.state}</td>
        </tr>
        <tr key={key + "b"}>
          <td></td>
          <td colSpan={3}>
            <SourceLinks edges={edge.node.sources.edges}></SourceLinks>
          </td>
        </tr>
      </>
    ));

    if (props.showSets) {
      rows.push((
        <tr key={key + "2"}>
          <td colSpan={5}>
            <Grid container>
              <Grid item xs={3} md={3}>
                <b>Set 1</b>
                <div dangerouslySetInnerHTML={{ __html: edge.node.set1}} />
              </Grid>
              <Grid item xs={3} md={3}>
                <b>Set 2</b>
                <div dangerouslySetInnerHTML={{ __html: edge.node.set2}} />
              </Grid>
              <Grid item xs={3} md={3}>
                <b>Set 3</b>
                <div dangerouslySetInnerHTML={{ __html: edge.node.set3}} />
              </Grid>
              <Grid item xs={3} md={3}>
                <b>Comment</b>
                <div dangerouslySetInnerHTML={{ __html: edge.node.comment}} />
              </Grid>
            </Grid>
          </td>
        </tr>
      ))
    }
  });

  return (
    <table className="table table-double-striped" width="100%">
      <thead>
        <tr>
          <th>Date</th>
          <th>Venue</th>
          <th>City</th>
          <th>State</th>
        </tr>
        <tr>
          <th></th>
          <th colSpan={3}>Sources</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
