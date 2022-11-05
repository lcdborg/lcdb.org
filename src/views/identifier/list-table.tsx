import Link from "next/link";
import SourceLink from "../source/source-link";

function SourceComment(props: any) {
  if (! props.source) {
    return (<><tr></tr></>);
  }

  return (
    <>
    <tr>
      <td>
        <SourceLink source={props.source}></SourceLink>
      </td>
    <td colSpan={2}
          dangerouslySetInnerHTML={{ __html: props.source.comments}} />
    </tr>
    </>
  )
}

export default function ListTable(props: any) {
  const rows: any[] = [];

  props.identifiers.edges.map((edge: any, key: any) => {
    rows.push((
      <>
      <tr key={key + "a"}>
        <td>
          <Link
            href={{
              pathname: '/identifier/' + edge.node.archiveIdentifier
            }}
          >
            <a title={edge.node.title}>
              {edge.node.archiveIdentifier}
            </a>
          </Link>
        </td>
        <td className="performance-date">{edge.node.performanceDate}</td>
        <td>{edge.node.venue}</td>
      </tr>
      <SourceComment key={key + "b"} source={edge.node.source}></SourceComment>
      </>
    ));
  });

  return (
    <table width="100%" className="table table-double-striped">
      <thead>
        <tr>
          <th>Archive Identifier</th>
          <th>Date</th>
          <th>Venue</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
