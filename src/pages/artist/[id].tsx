import Head from 'next/head';
import { graphql } from '../../utils/graphql';
import Link from 'next/link';
import { useState } from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import ListTable from 'src/views/performance/list-table';
import UserIcon from 'src/layouts/components/UserIcon';
import { FlipVertical } from 'mdi-material-ui';
import CreatorButton from 'src/views/components/buttons/creator';
import ArtistGroupButton from 'src/views/components/buttons/artist-group';
import SourcesButton from 'src/views/components/buttons/sources';

export async function getServerSideProps(context: any) {
  const query = `
    query Artist($id: Int!, $year: Int = 2022) {
      sourceCount(id: $id)

      artist (id: $id) {
        id
        name
        years
        creators {
          edges {
            node {
              id
              name
            }
          }
        }
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
        performances (
          filter: {
            year: { eq: $year }
            date: { sort: "ASC"}
          }
        ) {
          totalCount
          edges {
            node {
              id
              date
              year
              venue
              city
              state
              set1
              set2
              set3
              comment
              sources {
                edges {
                  node {
                    id
                    comments
                    archiveIdentifier
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const id = Number(context.query.id);
  let year = Number(context.query.year);

  if (! year) {
    const artistLatestYearQuery = `
      query Artist($id: Int!) {
        artist (id: $id) {
          latestYear
        }
      }
    `;

    const result = await graphql(artistLatestYearQuery, {id}, 'Artist');
    year = result.data.artist.latestYear;
  }

  const graphqlResult = await graphql(query, {id, year}, '');

  return {
    props: {
      graphql: graphqlResult,
      year,
      id
    },
  }
}

const NavButtons = (props: any) => {
  const buttons: any[] = [];

  if ( props.graphql.data.sourceCount) {
    buttons.push((
      <SourcesButton artist={props.graphql.data.artist} year={props.year}></SourcesButton>
    ))
  }

  if (props.graphql.data.artist.artistToArtistGroups && props.graphql.data.artist.artistToArtistGroups.edges) {
    props.graphql.data.artist.artistToArtistGroups.edges.map((edge: any, key: any) => {
      buttons.push((
        <ArtistGroupButton key={key} artistGroup={edge.node.artistGroup} year={props.year}></ArtistGroupButton>
      ));
    });
  }

  if (props.graphql.data.artist.creators && props.graphql.data.artist.creators.edges) {
    props.graphql.data.artist.creators.edges.map((edge: any, key: any) => {
      buttons.push((
        <CreatorButton key={key} creator={edge.node} year={props.year}></CreatorButton>
      ));
    });
  }

  buttons.push((
    <Button
      key="toggle-sets"
      className="btn btn-info btn-sm"
      onClick={props.toggleSets}
      color="info"
      variant="contained"
      title="Toggle Sets"
    >
      <UserIcon icon={FlipVertical}></UserIcon>
    </Button>
  ));

  return (
    <div className="card-title">
      {buttons}
    </div>
  );
}

const Years = (props: any) => {
  const years: any[] = [];

  props.graphql.data.artist.years.map((year: any, key: any) => {
    years.push((
      <>
      <Link
        key={key}
        href={{
          pathname: "/artist/" + props.graphql.data.artist.id,
          query: {year}
        }}
      >
      <a
        className="year-link"
      >
        {(year === 1939) ? 'unknown' : year}
      </a>
      </Link>
      {' '}
      </>
    ));
  });

  return (
    <div >{years}</div>
  );
}

function Artist(props: any) {
  const [showSets, setShowSets] = useState(false);

  const toggleSets = () => {
    setShowSets(! showSets);
  }

  return (
    <>
      <Head>
        <title>LCDB: Performances for {props.graphql.data.artist.name}</title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Performances for {props.graphql.data.artist.name}
              </Typography>

              <NavButtons toggleSets={toggleSets} year={props.year} graphql={props.graphql}></NavButtons>

              <div className="card-category">
                <Years graphql={props.graphql}></Years>
              </div>

              <hr />

              <ListTable graphql={props.graphql} showSets={showSets}></ListTable>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Artist