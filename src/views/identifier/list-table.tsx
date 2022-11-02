import ArchiveIdentifier from "../source/archive-identifier";

export default function ListTable(props: any) {
  const rows: any[] = [];

  props.identifiers.edges.map((edge: any, key: any) => {
    rows.push((
      <>
      <tr key={key + "a"}>
        <td>{edge.node.performanceDate}</td>
        <td>{edge.node.venue}</td>
        <td>{edge.node.title}</td>
        <td>
          <ArchiveIdentifier identifier={edge.node.archiveIdentifier}></ArchiveIdentifier>
        </td>
      </tr>
      </>
    ));
  });

  return (
    <table width="100%" className="table table-striped">
      <thead>
        <tr>
          <th>Date</th>
          <th>Venue</th>
          <th>Title</th>
          <th>Archive Identifier</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
