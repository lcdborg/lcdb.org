import Link from "next/link";

export default function UserListTable(props: any) {

  return (
    <table width="100%" className="table table-striped">
      <thead>
        <tr>
          <th>List Name</th>
          <th>Performance Count</th>
        </tr>
        <tr>
          <td>
            <Link href={"/user/" + props.user.username}>
              All Performances
            </Link>
          </td>
          <td>{props.user.userPerformanceCount}</td>
        </tr>
      </thead>
      <tbody>
      {
        props.userLists.edges.map((edge: any, key: any) => (
          <tr key={key}>
            <td>
              <Link href={"/user/" + props.user.username + "/" + edge.node.shortname}>
                {edge.node.name}
              </Link>
            </td>
            <td>
              {edge.node.userPerformanceCount}
            </td>
          </tr>
        ))
      }
    </tbody>
    </table>
  )

}
