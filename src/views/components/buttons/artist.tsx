import { Button } from "@mui/material";
import { AccountOutline } from "mdi-material-ui";
import UserIcon from "src/layouts/components/UserIcon";

export default function ArtistButton(props: any) {
  return (
    <Button
      href={'/artist/' + props.artist.id + '?year=' + props.year}
      color="success"
      variant="contained"
      title={props.artist.name + ' Performances'}
      style={{marginRight: "1em"}}
    >
      <UserIcon icon={AccountOutline}></UserIcon>
    </Button>
  );
}
