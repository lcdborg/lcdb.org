import { Grid, Typography } from "@mui/material";
import nl2br from "src/utils/nl2br";
import Venue from "../performance/venue";
import ArtistLink from "../artist/artist-link";
import { PerformanceLink } from "../performance/performance-link";
import dateFormat from "src/utils/date-format";
import MediaSize from "./media-size";
import Checksums from "./checksums";
import Link from "next/link";

export default function Details(props: any) {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        <ArtistLink artist={props.source.performance.artist} year={props.source.performance.year}></ArtistLink>
        &nbsp;
        <PerformanceLink performance={props.source.performance}></PerformanceLink>
        &nbsp;
        SHNID {String(props.source.id)}
      </Typography>

      <Typography gutterBottom variant="h5" component="div">
        <Venue performance={props.source.performance}></Venue>
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <hr />
          <strong>Summary</strong>
          &nbsp;
          <span>
            (<Link href={'https://graphql.lcdb.org/api/source/' + String(props.source.id) + '/download'}>
              download all files
            </Link>)
          </span>
          <div>
            {nl2br(props.source.comments)}
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <hr />
          <strong>Textdoc</strong>
          &nbsp;
          <span>
            (<Link href={'https://graphql.lcdb.org/api/source/' + String(props.source.id) + '/textdoc/download'}>
              download
            </Link>)
          </span>
          <div style={{fontSize: '.8em', fontFamily: "'Courier Prime', Courier"}}>
            {nl2br(props.source.textdoc)}
          </div>
        </Grid>
        <Grid item xs={6} md={6}>
          <strong>Media Size</strong>
          <div>
            <MediaSize size={props.source.mediaSize}></MediaSize>
          </div>
        </Grid>
        <Grid item xs={6} md={6}>
          <strong>Media Size Uncompressed</strong>
          <div>
            <MediaSize size={props.source.mediaSizeUncompressed}></MediaSize>
          </div>
        </Grid>
        <Grid item xs={6} md={6}>
          <strong>SHN Disc Count</strong>
          <div>
            {props.source.shndiskcount}
          </div>
        </Grid>
        <Grid item xs={6} md={6}>
          <strong>WAV Disc Count</strong>
          <div>
            {props.source.wavdiskcount}
          </div>
        </Grid>
        <Grid item xs={6} md={6}>
          <strong>Date Circulated</strong>
          <div>
            {props.source.circdate}
          </div>
        </Grid>
        <Grid item xs={6} md={6}>
          <strong>Entered By</strong>
          <div>
            {props.source.enterUsername}
          </div>
        </Grid>
        <Grid item xs={6} md={6}  style={{fontSize: '.8em'}}>
          <strong>Created At</strong>
          <div>
            {dateFormat(props.source.createdAt)}
          </div>
        </Grid>
        <Grid item xs={6} md={6} style={{fontSize: '.8em'}}>
          <strong>Updated At</strong>
          <div>
            {dateFormat(props.source.updatedAt)}
          </div>
        </Grid>
      </Grid>

      <Checksums checksums={props.source.checksums}></Checksums>
    </>
  )
}
