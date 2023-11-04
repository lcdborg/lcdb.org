import { Grid, Typography } from "@mui/material";
import Link from "next/link";

export default function Checksums(props: any) {
  if (! props.checksums) {
    return (<></>);
  }

  const grids: any[] = [];
  props.checksums.edges.map((edge: any, key: any) => {
    grids.push((
      <Grid item xs={12} md={12} key={key}>
        <strong>{edge.node.description}</strong>
        {' '}
        <span>
          (<Link href={props.server + '/api/checksum/' + String(edge.node.id) + '/download'}>
            download
          </Link>)
        </span>

        <pre style={{whiteSpace: 'pre-wrap', fontSize: '.8em', fontFamily: "'Courier Prime', Courier"}}>
          {edge.node.body}
        </pre>
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