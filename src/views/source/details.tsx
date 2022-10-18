import { Grid, Typography } from "@mui/material";
import nl2br from "src/utils/nl2br";
import Venue from "../performance/venue";
import ArtistLink from "../artist/artist-link";
import performanceDate from "../performance/performance-date";

export default function Details(props: any) {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        <ArtistLink artist={props.source.performance.artist} year={props.source.performance.year}></ArtistLink>
        &nbsp;
        {performanceDate(props.source.performance)}
        &nbsp;
        {String(props.source.id)}
      </Typography>

      <Typography gutterBottom variant="h5" component="div">
        <Venue performance={props.source.performance}></Venue>
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <hr />
          <strong>Summary</strong>
          <div>
            {nl2br(props.source.comments)}
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <hr />
          <strong>Textdoc</strong>
          <div>
            {nl2br(props.source.textdoc)}
          </div>
        </Grid>
      </Grid>
    </>
  )
}
