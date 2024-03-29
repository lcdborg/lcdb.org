import { UserLink } from "./user-link";
import ArtistLink from "../artist/artist-link";
import { dateFormatShort } from "src/utils/date-format";

export function UserTable(props: any) {

  return (
    <table width="100%" className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>#</th>
          <th>Active (0-5)</th>
          <th>Top Collections</th>
          <th>Last Update</th>
        </tr>
      </thead>
      <tbody>
      {
        props.users.edges.map((edge: any, key: any) => (
          <tr key={key}>
            <td>
              <UserLink user={edge.node}></UserLink>
            </td>
            <td align="center">
              {edge.node.userPerformanceCount}
            </td>
            <td align="center">
              {edge.node.activetrading}
            </td>
            <td>
              <ul className="comma-list">
                {
                  edge.node.topArtists.map((topArtist: any, topArtistKey: any) => (
                    <li key={topArtistKey}>
                      <ArtistLink artist={topArtist}></ArtistLink>
                      {' '}
                      ({topArtist.userPerformanceCount})
                    </li>
                  ))
                }
              </ul>
            </td>
            <td align="center">
              {dateFormatShort(edge.node.lastUpdate)}
            </td>
          </tr>
        ))
      }
      </tbody>
    </table>
  )
}
