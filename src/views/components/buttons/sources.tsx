import { Button } from "@mui/material";
import { MusicBoxOutline } from "mdi-material-ui";
import UserIcon from "src/layouts/components/UserIcon";

export default function SourcesButton(props: any) {
  return (
    <Button
      variant="contained"
      color="primary"
      href={'/sources/' + props.artist.id + '?year=' + props.year}
      title={props.artist.name + " Sources"}
      style={{marginRight: "1em"}}
    >
      <UserIcon icon={MusicBoxOutline}></UserIcon>
    </Button>
  );
}
