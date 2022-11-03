import { Button } from "@mui/material";
import { MusicBoxMultipleOutline } from "mdi-material-ui";
import UserIcon from "src/layouts/components/UserIcon";

export default function SourceArtistGroupButton(props: any) {
  return (
    <Button
      href={'/artist-group-sources/' + props.artistGroup.id + '?year=' + props.year}
      variant="contained"
      color="primary"
      title={props.artistGroup.title + ' Artist Group Sources'}
      style={{marginRight: "1em"}}
    >
      <UserIcon icon={MusicBoxMultipleOutline}></UserIcon>
    </Button>
  );
}
