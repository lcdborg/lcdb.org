import { Grid, Typography } from "@mui/material";
import nl2br from "src/utils/nl2br";
import Venue from "./venue";
import ListTable from "src/views/source/list-table";
import ArtistLink from "../artist/artist-link";
import PerformanceDate from "./performance-date";

export default function Details(props: any) {

  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        <ArtistLink artist={props.performance.artist} year={props.performance.year}></ArtistLink>
        &nbsp;
        <PerformanceDate performance={props.performance}></PerformanceDate>
      </Typography>

      <Typography gutterBottom variant="h5" component="div">
        <Venue performance={props.performance}></Venue>
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <hr />
          <strong>Set 1</strong>
          <div>
            {nl2br(props.performance.set1)}
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <hr />
          <strong>Set 2</strong>
          <div>
            {nl2br(props.performance.set2)}
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <hr />
          <strong>Set 3</strong>
          <div>
            {nl2br(props.performance.set3)}
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <hr />
          <strong>Comment</strong>
          <div>
            {nl2br(props.performance.comment)}
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <hr />
          <strong>Sources</strong>
          <div>
            <ListTable sources={props.performance.sources}></ListTable>
          </div>
        </Grid>
      </Grid>
    </>
  )
}
