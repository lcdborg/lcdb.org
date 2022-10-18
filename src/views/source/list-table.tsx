import { PerformanceLink } from "../performance/performance-link";
import ArchiveIdentifier from "./archive-identifier";
import SourceLink from "./source-link";

export default function ListTable(props: any) {
  const rows: any[] = [];

  props.sources.edges.map((edge: any, key: any) => {
    rows.push((
      <>
      <tr key={key + "a"}>
        <td>
          <SourceLink source={edge.node}></SourceLink>
        </td>
        <td>
          <PerformanceLink performance={edge.node.performance}></PerformanceLink>
        </td>
        <td>{edge.node.performance.venue}</td>
        <td>{edge.node.performance.city}</td>
        <td>{edge.node.performance.state}</td>
        <td><ArchiveIdentifier identifier={edge.node.archiveIdentifier}></ArchiveIdentifier>
        </td>
      </tr>
      <tr key={key + "b"}>
        <td colSpan={6}
          dangerouslySetInnerHTML={{ __html: edge.node.comments}} />
      </tr>
      </>
    ));
  });

  return (
    <table width="100%" className="table table-double-striped">
      <thead>
        <tr>
          <th>SHNID</th>
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
