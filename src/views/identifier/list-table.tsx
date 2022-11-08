import Link from "next/link";
import SourceLink from "../source/source-link";

function SourceComment(props: any) {
  if (! props.source) {
    return (<><tr></tr></>);
  }

  return (
    <>
      <tr key={props.key}>
        <td>
          <SourceLink source={props.source}></SourceLink>
        </td>
        <td style={{wordBreak: 'break-word'}}
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
        <td colSpan={2} style={{wordBreak: 'break-all'}}>
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
      </tr>
      <tr key={key + "b"}>
        <td className="performance-date">{edge.node.performanceDate}</td>
        <td>{edge.node.venue}</td>
      </tr>
      <SourceComment key={key + "c"} source={edge.node.source}></SourceComment>
      </>
    ));
  });

  return (
    <table width="100%" className="table table-triple-striped">
      <thead>
        <tr>
          <th colSpan={2}>Archive Identifier</th>
        </tr>
        <tr>
          <th>Date</th>
          <th>Venue</th>
        </tr>
        <tr>
          <th colSpan={2}>Source</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
