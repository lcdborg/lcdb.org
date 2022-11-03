import { Button } from "@mui/material";
import { AccountGroupOutline } from "mdi-material-ui";
import UserIcon from "src/layouts/components/UserIcon";

export default function ArtistGroupButton(props: any) {
  return (
    <Button
      href={'/artist-group/' + props.artistGroup.id + '?year=' + props.year}
      color="warning"
      variant="contained"
      title={props.artistGroup.title + ' Artist Group'}
      style={{marginRight: "1em"}}
      >
      <UserIcon icon={AccountGroupOutline}></UserIcon>
    </Button>
  );
}
