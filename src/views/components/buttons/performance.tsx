import { Button } from "@mui/material";
import { MusicNoteOutline } from "mdi-material-ui";
import UserIcon from "src/layouts/components/UserIcon";

function performanceDate(performance: any) {
  return performance.year
    + '-'
    + performance.date.slice(0, 2)
    + '-'
    + performance.date.slice(3, 5);
}

export default function PerformanceButton(props: any) {
  return (
    <Button
      href={'/performance/' + props.performance.id}
      color="success"
      variant="contained"
      title={performanceDate(props.performance) + ' ' + props.creator.name}
      style={{marginRight: "1em"}}
      className="performance-link"
    >
      <UserIcon icon={MusicNoteOutline}></UserIcon>
      {performanceDate(props.performance)}
    </Button>
  );
}
