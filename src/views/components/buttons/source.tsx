import { Button } from "@mui/material";
import { MusicBoxOutline } from "mdi-material-ui";
import UserIcon from "src/layouts/components/UserIcon";

function performanceDate(performance: any) {
  return performance.year
    + '-'
    + performance.date.slice(0, 2)
    + '-'
    + performance.date.slice(3, 5);
}

export default function SourceButton(props: any) {
  return (
    <Button
      href={'/source/' + props.source.id}
      color="primary"
      variant="contained"
      title={performanceDate(props.performance) + ' ' + props.artist.name + '(' + props.source.id + ')'}
      style={{marginRight: "1em"}}
      className="source-link"
    >
      <UserIcon icon={MusicBoxOutline}></UserIcon>
      {props.source.id}
    </Button>
  );
}
