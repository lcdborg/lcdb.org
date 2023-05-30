import nl2br from "src/utils/nl2br";
import Venue from "./venue";
import ArtistLink from "../artist/artist-link";
import performanceDate from "./performance-date";

export function DetailTable(props: any) {
  return (
    <table width="100%" className="table table-striped">
      <thead>
        <tr>
          <th colSpan={2}>
              <ArtistLink artist={props.performance.artist} year={props.performance.year}></ArtistLink>
              {' '}
              {performanceDate(props.performance)}
              {' '}
              <Venue performance={props.performance}></Venue>
          </th>
        </tr>
      </thead>
      <tbody>
      <tr>
          <td>
            Set 1
          </td>
          <td>
            {nl2br(props.performance.set1)}
          </td>
        </tr>
        <tr>
          <td>
            Set 2
          </td>
          <td>
            {nl2br(props.performance.set2)}
          </td>
        </tr>
        <tr>
          <td>
            Set 3
          </td>
          <td>
            {nl2br(props.performance.set3)}
          </td>
        </tr>
        <tr>
          <td>
            Comment
          </td>
          <td>
            {nl2br(props.performance.comment)}
          </td>
        </tr>
      </tbody>
    </table>
  )
}
