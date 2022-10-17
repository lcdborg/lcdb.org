import ArtistLink from "../artist/artist-link";
import { PerformanceLink } from "../performance/performance-link";
import ArchiveIdentifier from "../source/archive-identifier";
import SourceLink from "../source/source-link";

export function ListTable(props: any) {
  const rows: any[] = [];

  props.graphql.data.sources.edges.map((edge: any, key: any) => {
    rows.push((
      <>
      <tr key={key + "1"}>
        <td>
          <SourceLink source={edge.node}></SourceLink>
        </td>
        <td>
          <ArtistLink artist={edge.node.performance.artist} year={edge.node.performance.year}></ArtistLink>
        </td>
        <td>
          <PerformanceLink performance={edge.node.performance}></PerformanceLink>
        </td>
        <td>{edge.node.performance.venue}</td>
        <td>{edge.node.performance.city}</td>
        <td>{edge.node.performance.state}</td>
        <td>
          <ArchiveIdentifier identifier={edge.node.archiveIdentifier}></ArchiveIdentifier>
        </td>
      </tr>
      <tr key={key + "2"}>
        <td colSpan={7}
          dangerouslySetInnerHTML={{ __html: edge.node.comments}} />
      </tr>
      </>
    ));
  });

  return (
    <table className="table table-double-striped">
    <thead>
      <tr>
        <th>SHNID</th>
        <th>Artist</th>
        <th>Date</th>
        <th>Venue</th>
        <th>City</th>
        <th>State</th>
        <th>Archive Identifier</th>
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
  );
}
