import Head from 'next/head';
import { graphql } from '../../utils/graphql';
import { PaginationControls } from '../../utils/pagination';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import ListTable from 'src/views/source/list-table';

export async function getServerSideProps(context: any) {
  const query = `
    query ArtistSources($id: Int!, $after: String = "LTE=") {
      years: sourceYears(id: $id)

      artist (id: $id) {
        id
        name
        artistToArtistGroups {
          edges {
            node {
              artistGroup {
                id
                title
              }
            }
          }
        }
      }

      sources (filter: {_after: $after}) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        totalCount
        edges {
          node {
            id
            createdAt
            updatedAt

            circdate
            shndiskcount
            wavdiskcount
            archiveIdentifier

            comments
            textdoc

            mediaSize
            mediaSizeUncompressed

            performance {
              id
              date
              year
              venue
              city
              state
              artist {
                id
                name
              }
            }
          }
        }
      }
    }
  `;

  const page = Number(context.query.page) || 1;
  const id = Number(context.query.id);
  let year = Number(context.query.year);
  const after = Buffer.from(String((page - 1) * 300 - 1)).toString('base64')

  if (! year) {
    const latestYearQuery = `
      query SourceLatestYear($id: Int!) {
        sourceLatestYear(id: $id)
      }
    `;

    const result = await graphql(latestYearQuery, {id});
    year = result.data.sourceLatestYear;
  }

  const graphqlResult = await graphql(query, {id, year, after}, 'ArtistSources');

  return {
    props: {
      graphql: graphqlResult,
      year,
      id,
      page
    },
  }
}

const NavButtons = (props: any) => {
  const buttons: any[] = [];

  buttons.push((
    <Button variant='contained' href={'/artist/' + props.graphql.data.artist.id}
    >
      Performances
    </Button>
  ));

  if (props.graphql.data.artist.artistToArtistGroups && props.graphql.data.artist.artistToArtistGroups.edges) {
    props.graphql.data.artist.artistToArtistGroups.edges.map((edge: any, key: any) => {
      buttons.push((
        <Button
          variant='contained'
          key={key}
          href={'/artist-group/' + edge.node.artistGroup.id + '?year=' + props.year}
          color="warning"
        >
          {edge.node.artistGroup.title} Artist Group
        </Button>
      ));
    });
  }

  return (
    <div>
      {buttons}
    </div>
  );
}

const Years = (props: any) => {
  const years: any[] = [];

  props.graphql.data.years.map((year: any, key: any) => {
    years.push((
      <a
        key={key}
        href={"/sources/" + props.graphql.data.artist.id + "?year=" + year}
        className="year-link"
      >
        {(year === 1939) ? 'unknown' : year}
      </a>
    ));
  });

  return (
    <div>
      {years}
    </div>
  );
}


function ArtistSources(props: any) {
  return (
    <>
      <Head>
        <title>LCDB: Sources for {props.graphql.data.artist.name}</title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Sources for {props.graphql.data.artist.name}
              </Typography>

              <NavButtons year={props.year} graphql={props.graphql}></NavButtons>

              <Years graphql={props.graphql}></Years>

              <PaginationControls
                graphql={props.graphql.data.sources}
                page={props.page}
                pathname={'/sources/' + props.graphql.data.artist.id}
                baseQuery={{year: props.year}}>
              </PaginationControls>

              <hr />

              <ListTable sources={props.graphql.data.sources}></ListTable>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default ArtistSources