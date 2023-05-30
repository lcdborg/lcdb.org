import dateFormat from "src/utils/date-format";

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
            return (
              <tr key={key}>
                <td>{field[1]}</td>
                <td>
                  {props.userPerformance[field[0]]}
                </td>
              </tr>
            )
          }
        })}

      </tbody>
    </table>
  )
}
/*
sourceInfo
checksums
noise_reduction
scms_status
microphones
generation
note
j_card_comment
tech_note
traded_from
traded_from_email
tradesAllowed
status
attendance
userid
tapername
miclocation
*/