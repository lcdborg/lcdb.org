import { Grid, Typography } from "@mui/material";
import nl2br from "src/utils/nl2br";
import Venue from "../performance/venue";
import ArtistLink from "../artist/artist-link";
import { PerformanceLink } from "../performance/performance-link";
import { dateFormat } from "src/utils/date-format";
import MediaSize from "./media-size";
import Checksums from "./checksums";
import Link from "next/link";
import ArchiveIdentifier from "./archive-identifier";

export default function Details(props: any) {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        SHNID {String(props.source.id)}
        {' '}
        <ArtistLink artist={props.source.performance.artist} year={props.source.performance.year}></ArtistLink>
        {' '}
        <PerformanceLink performance={props.source.performance}></PerformanceLink>
        {' '}
        <ArchiveIdentifier identifier={props.source.archiveIdentifier}></ArchiveIdentifier>
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
            (<Link href={props.server + '/api/source/' + String(props.source.id) + '/download'}>
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
          {' '}
          <span>
            (<Link href={props.server + '/api/source/' + String(props.source.id) + '/textdoc/download'}>
              download
            </Link>)
          </span>
          <pre style={{whiteSpace: 'pre-wrap', fontSize: '.8em', fontFamily: "'Courier Prime', Courier"}}>
            {props.source.textdoc}
          </pre>
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

      <Checksums server={props.server} checksums={props.source.checksums}></Checksums>
    </>
  )
}
