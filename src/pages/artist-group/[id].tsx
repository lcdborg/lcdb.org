import Head from 'next/head';
import { graphql } from '../../utils/graphql';
import React, { useState } from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import PerformanceListTable from 'src/views/aritst-group/performance-list-table';

export async function getServerSideProps(context: any) {
  const query = `
  query ArtistGroupPerformances($id: Int!, $year: Int = 2022) {
    years: artistGroupYears(id: $id)

    sourceCount: artistGroupSourceCount(id: $id)

    artistGroupArtists(id: $id) {
      id
      name
    }

    artist: artistGroup (id: $id) {
      id
      name: title
    }

    performances (filter: {year: $year date_sort: "ASC"}) {
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
      <Button
          variant="contained"
          key="sources"
          href={'/artist-group-sources/' + props.graphql.data.artist.id + '?year=' + props.year}
        >
          Artist Group Sources
      </Button>
    ))
  }

  if (props.graphql.data.artistGroupArtists) {
    props.graphql.data.artistGroupArtists.map((edge: any, key: any) => {
      buttons.push((
        <Button
          variant="contained"
          key={key}
          href={'/artist/' + edge.id + '?year=' + props.year}
          color="warning"
        >
          {edge.name}
        </Button>
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
      Toggle Sets
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
      <a
        key={key}
        href={"/artist-group/" + props.graphql.data.artist.id + "?year=" + year}
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

export function ArtistGroup(props: any) {
  const [showSets, setShowSets] = useState(false);

  const toggleSets = () => {
    setShowSets(! showSets);
  }

  return (
    <>
      <Head>
        <title>LCDB: Artist Group Performances for {props.graphql.data.artist.name}</title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Artist Group Performances for {props.graphql.data.artist.name}
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