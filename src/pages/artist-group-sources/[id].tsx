import Head from 'next/head';
import { graphql } from '../../utils/graphql';
import Link from 'next/link';
import { PaginationControls} from '../../utils/pagination';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { ListTable } from 'src/views/artist-group-sources/list-table';
import ArtistGroupButton from 'src/views/components/buttons/artist-group';
import SourcesButton from 'src/views/components/buttons/sources';

export async function getServerSideProps(context: any) {
  const query = `
    query ArtistGroupSources($id: Int!, $after: String = "LTE=") {
      artistGroup (id: $id) {
        id
        title
        header
        footer
        sourceYears
        artistsByName {
          id
          name
        }
      }

      sources (
        pagination: { after: $after }
      ) {
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

  async function getLatestYear() {
    const latestYearQuery = `
      query ArtistGroup($id: Int!) {
        artistGroup (id: $id) {
          sourceLatestYear
        }
      }
    `;

    const result = await graphql(latestYearQuery, {id});

    return result.data.artistGroup.sourceLatestYear;
  }

  const page = Number(context.query.page) || 1;
  const id = Number(context.query.id);
  let year = Number(context.query.year);
  const after = Buffer.from(String((page - 1) * 300 - 1)).toString('base64')

  if (! year) {
    year = await getLatestYear();
  }

  const graphqlResult = await graphql(query, {id, year, after}, 'ArtistGroupSources');

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
    <ArtistGroupButton artistGroup={props.graphql.data.artistGroup} year={props.year}></ArtistGroupButton>
  ));

  if (props.graphql.data.artistGroup.artistsByName) {
    props.graphql.data.artistGroup.artistsByName.map((node: any, key: any) => {
      buttons.push((
        <SourcesButton key={key} artist={node} year={props.year}></SourcesButton>
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

  props.graphql.data.artistGroup.sourceYears.map((year: any, key: any) => {
    years.push((
      <>
      <Link
        key={key}
        href={{
          pathname: '/artist-group-sources/' + props.graphql.data.artistGroup.id,
          query: {year}
        }}
      >
        <a className="year-link">{(year === 1939) ? 'unknown' : year}</a>
      </Link>
      {' '}
      </>
    ));
  });

  return (
    <>{years}</>
  );
}

function ArtistGroupSources(props: any) {
  return (
    <>
      <Head>
        <title>{props.graphql.data.artistGroup.title}</title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Sources for Artist Group {props.graphql.data.artistGroup.title}
              </Typography>

              <NavButtons year={props.year} graphql={props.graphql}></NavButtons>
              <Years graphql={props.graphql}></Years>

              <PaginationControls
                graphql={props.graphql.data.sources}
                page={props.page}
                pathname={'/artist-group-sources/' + props.graphql.data.artistGroup.id}
                baseQuery={{year: props.year}}>
              </PaginationControls>

              <hr />
              <ListTable graphql={props.graphql}></ListTable>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default ArtistGroupSources