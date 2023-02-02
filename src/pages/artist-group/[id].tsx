import Head from 'next/head';
import { graphql } from '../../utils/graphql';
import React, { useState } from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import PerformanceListTable from 'src/views/aritst-group/performance-list-table';
import SourceArtistGroupButton from 'src/views/components/buttons/source-artist-group';
import ArtistButton from 'src/views/components/buttons/artist';
import UserIcon from 'src/layouts/components/UserIcon';
import { FlipVertical } from 'mdi-material-ui';

export async function getServerSideProps(context: any) {
  const query = `
  query ArtistGroupPerformances($id: Int!, $year: Int = 2022) {
    years: artistGroupYears(id: $id)

    sourceCount: artistGroupSourceCount(id: $id)

    artistGroupArtists(id: $id) {
      id
      name
    }

    artistGroup (id: $id) {
      id
      title
    }

    performances (
      filter: {
        year: { eq: $year }
        date: { sort: "ASC" }
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
          artist {
            id
            name
          }
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
  `;

  const id = Number(context.query.id);
  let year = Number(context.query.year);

  if (! year) {
    const latestYearQuery = `
      query ArtistGroupLatestYear($id: Int!) {
        latestYear: artistGroupLatestYear(id: $id)
      }
    `;

    const result = await graphql(latestYearQuery, {id}, '');
    year = result.data.latestYear;
  }

  const graphqlResult = await graphql(query, {id, year}, 'ArtistGroupPerformances');

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
      <SourceArtistGroupButton artistGroup={props.graphql.data.artistGroup} year={props.year}></SourceArtistGroupButton>
    ))
  }

  if (props.graphql.data.artistGroupArtists) {
    props.graphql.data.artistGroupArtists.map((edge: any, key: any) => {
      buttons.push((
        <ArtistButton key={key} artist={edge} year={props.year}></ArtistButton>
      ));
    });
  }

  buttons.push((
    <Button
      variant="contained"
      key="toggle-sets"
      className="btn btn-info btn-sm"
      onClick={props.toggleSets}
      color="info"
    >
      <UserIcon icon={FlipVertical}></UserIcon>
    </Button>
  ));

  return (
    <div className="card-title btn-group">
      {buttons}
    </div>
  );
}

const Years = (props: any) => {
  const years: any[] = [];

  props.graphql.data.years.map((year: any, key: any) => {
    years.push((
      <>
      <a
        key={key}
        href={"/artist-group/" + props.graphql.data.artistGroup.id + "?year=" + year}
        className="year-link"
      >
        {(year === 1939) ? 'unknown' : year}
      </a>
      {' '}
      </>
    ));
  });

  return (
    <div>
      {years}
    </div>
  );
}

export function ArtistGroup(props: any) {
  const [showSets, setShowSets] = useState(false);

  const toggleSets = () => {
    setShowSets(! showSets);
  }

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
                Artist Group Performances for {props.graphql.data.artistGroup.title}
              </Typography>

              <NavButtons toggleSets={toggleSets} year={props.year} graphql={props.graphql}></NavButtons>
              <Years graphql={props.graphql}></Years>

              <hr />

              <PerformanceListTable graphql={props.graphql} showSets={showSets}></PerformanceListTable>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default ArtistGroup