import { Button } from "@mui/material";
import { ArchiveOutline } from "mdi-material-ui";
import UserIcon from "src/layouts/components/UserIcon";

export default function CreatorButton(props: any) {
  return (
    <Button
      href={'/creator/' + props.creator.id + '?year=' + props.year}
      color="secondary"
      variant="contained"
      title={props.creator.name + ' Creator'}
      style={{marginRight: "1em"}}
    >
      <UserIcon icon={ArchiveOutline}></UserIcon>
    </Button>
  );
}
