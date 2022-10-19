import { Grid, Typography } from "@mui/material";
import nl2br from "src/utils/nl2br";

export default function Checksums(props: any) {
  if (! props.checksums) {
    return (<></>);
  }

  const grids: any[] = [];
  props.checksums.edges.map((edge: any, key: any) => {
    grids.push((
      <Grid item xs={12} md={12} key={key}>
        <strong>{edge.node.description}</strong>
        <br />
        <div style={{fontSize: '.8em', fontFamily: "'Courier Prime', Courier"}}>
          {nl2br(edge.node.body)}
        </div>
      </Grid>
    ));
  })

  return (
    <>
      <br />
      <Typography gutterBottom variant="h5" component="div">
        Checksums
      </Typography>

      <Grid container spacing={6}>
        {grids}
      </Grid>
    </>
  )
}