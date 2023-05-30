import { PerformanceLink } from "../performance/performance-link";
import ArchiveIdentifier from "./archive-identifier";
import SourceLink from "./source-link";

export function DetailTable(props: any) {
  if (! props.source) {
    return (<></>)
  }

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
        <tr>
          <td>
            <SourceLink source={props.source}></SourceLink>
          </td>
          <td>
            <PerformanceLink performance={props.source.performance}></PerformanceLink>
          </td>
          <td>{props.source.performance.venue}</td>
          <td>{props.source.performance.city}</td>
          <td>{props.source.performance.state}</td>
          <td><ArchiveIdentifier identifier={props.source.archiveIdentifier}></ArchiveIdentifier>
          </td>
        </tr>
        <tr>
          <td colSpan={6}
            dangerouslySetInnerHTML={{ __html: props.source.comments}} />
        </tr>
      </tbody>
    </table>
  );
}
