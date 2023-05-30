import dateFormat from "src/utils/date-format";
import nl2br from "src/utils/nl2br";

export function DetailTable(props: any) {
  const fields = {
    "reference_number": "Reference Number",
    "status": "Status",
    "media_type": "Media Type",
    "media_count": "Media Count",
    "show_rating": "Show Rating",
    "sound_rating": "Sound Rating",
    "note": "Note",
    "sourceInfo": "Source Info",
    "checksums": "Checksums",
    "microphones": "Microphones",
    "miclocation": "Microphone Location",
    "j_card_comment": "J-Card Comment",
    "tech_note": "Tech Note",
    "traded_from": "Traded From",
    "traded_from_email": "Traded From Email",
    "tradesAllowed": "Trades Allowed",
    "tapername": "Taper Name",
    "generation": "Generation",
    "attendance": "Attendence",
    "noise_reduction": "Noise Reduction",
    "scms_status": "SCMS Status",
  };

  return (
    <table className="table table-striped" width="100%">
      <thead>
      </thead>
      <tbody>
      <tr>
          <td>Identifier</td>
          <td>
            {props.userPerformance.id}
          </td>
        </tr>
        <tr>
          <td>Created At</td>
          <td>
            {dateFormat(props.userPerformance.createdAt)}
          </td>
        </tr>

        {Object.entries(fields).map((field: any, key: any) => {
          if (props.userPerformance[field[0]]) {

            let value = props.userPerformance[field[0]];

            switch (field[0]) {
              case 'note':
              case 'microphones':
              case 'sourceInfo':
                value = nl2br(props.userPerformance[field[0]]);
                break;
            }


            return (
              <tr key={key}>
                <td>{field[1]}</td>
                <td>
                  {value}
                </td>
              </tr>
            )
          }
        })}

      </tbody>
    </table>
  )
}
