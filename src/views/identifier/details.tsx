import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import nl2br from "src/utils/nl2br";
import CreatorLink from "../creator/creator-link";
import SourceLink from "../source/source-link";

function Source(props: any) {
  if (! props.source) {
    return (<></>);
  }

  return (
    <Grid item xs={12} md={12}>
      <hr />
      <strong>Source </strong>
      <SourceLink source={props.source}></SourceLink>
      <div>
        {nl2br(props.source.comments)}
      </div>
    </Grid>
  );
}

function Files(props: any) {
  if (! props.files || ! props.files.edges.length) {
    return (<></>);
  }

  const rows: any = [];
  props.files.edges.map((edge: any, key: any) => {
    rows.push(
      <tr key={key}>
        <td>
          {edge.node.name}
          {' '}
          <span>
            (<Link href={props.server + '/api/file/' + String(edge.node.id) + '/download'}>
              download
            </Link>)
          </span>
        </td>
      </tr>
    );
  });

  return (
    <>
      <hr/>
      <table width="100%" className="table table-striped">
        <thead>
          <tr>
            <th>Files
              {' '}
              <span>
                (<Link href={props.server + '/api/identifier/' + props.identifier.archiveIdentifier + '/download'}>
                  download all files
                </Link>)
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </>
  );
}

export default function Details(props: any) {
  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        <CreatorLink creator={props.identifier.creator} year={props.identifier.year}></CreatorLink>
        {' '}
        {props.identifier.archiveIdentifier}
      </Typography>

      <Typography gutterBottom variant="h5" component="div">
        {props.identifier.performanceDate}
        {' '}
        {props.identifier.venue}
      </Typography>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>

          <iframe
            src={"https://archive.org/embed/" + props.identifier.archiveIdentifier + "?playlist=1&list_height=150"}
            width={400}
            height={180}
            frameBorder={0}
            allowFullScreen={true}></iframe>
        </Grid>

        <Grid item xs={12} md={12}>
          <hr />
          <strong>Title</strong>

          <div>
            {nl2br(props.identifier.title)}
          </div>
        </Grid>
        <Source source={props.identifier.source}></Source>
        <Grid item xs={12} md={12}>
          <hr />
          <strong>description</strong>
          <div>
            {nl2br(props.identifier.description)}
          </div>
        </Grid>
      </Grid>

      <Files
        server={props.server}
        files={props.identifier.files}
        identifier={props.identifier}
      ></Files>
    </>
  )
}
