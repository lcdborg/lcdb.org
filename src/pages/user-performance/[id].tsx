import { Card, CardContent, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { graphql } from "src/utils/graphql";
import { DetailTable as SourceDetailTable } from "src/views/source/detail-table";
import { DetailTable as PerformanceDetailTable } from "src/views/performance/detail-table";
import { DetailTable as UserPerformanceDetailTable } from "src/views/user-performance/detail-table";
import performanceDate from "src/views/performance/performance-date";
import ArtistLink from "src/views/artist/artist-link";
import { UserLink } from "src/views/user/user-link";
import { PerformanceLink } from "src/views/performance/performance-link";

export async function getServerSideProps(context: any) {
  const query = `
    query UserPerformance($id: Int!) {
      userPerformance (id: $id) {
        sourceInfo
        checksums
        createdAt
        media_count
        media_type
        noise_reduction
        scms_status
        show_rating
        sound_rating
        microphones
        generation
        note
        j_card_comment
        tech_note
        reference_number
        traded_from
        traded_from_email
        tradesAllowed
        status
        attendance
        tapername
        miclocation
        id
        user {
          id
          username
          name
        }
        source {
          ...SourceParts
        }
        performance {
          artist {
            ...ArtistParts
          }
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
          createdAt
          updatedAt
          sources {
            edges {
              node {
                ...SourceParts
              }
            }
          }
        }
      }
    }

    fragment ArtistParts on Artist {
      id
      name
    }

    fragment SourceParts on Source {
      id
      createdAt
      updatedAt
      circdate
      archiveIdentifier
      comments
      performance {
        id
        date
        year
        venue
        city
        state
        artist {
          ...ArtistParts
        }
      }
    }
  `;

  const id = Number(context.query.id);
  const graphqlResult = await graphql(query, {id}, 'UserPerformance');

  return {
    props: {
      graphql: graphqlResult,
    },
  }
}

function SourceSection(props: any) {
  if (! props.source) {
    return (<></>)
  }

  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        Source
      </Typography>

      <SourceDetailTable source={props.source}></SourceDetailTable>
    </>
  )
}

function UserPerformance(props: any) {
  return (
    <>
      <Head>
        <title>
          {props.graphql.data.userPerformance.user.name}
          {': '}
          {props.graphql.data.userPerformance.performance.artist.name}
          {' '}
          {performanceDate(props.graphql.data.userPerformance.performance)}
        </title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <UserLink user={props.graphql.data.userPerformance.user}></UserLink>
                {': '}
                <ArtistLink
                  artist={props.graphql.data.userPerformance.performance.artist}
                  year={props.graphql.data.userPerformance.performance.year}
                ></ArtistLink>
                {' '}
                <PerformanceLink performance={props.graphql.data.userPerformance.performance}></PerformanceLink>
              </Typography>

              <UserPerformanceDetailTable userPerformance={props.graphql.data.userPerformance}></UserPerformanceDetailTable>

              <SourceSection source={props.graphql.data.userPerformance.source}></SourceSection>

              <Typography gutterBottom variant="h5" component="div">
                Performance
              </Typography>
              <PerformanceDetailTable performance={props.graphql.data.userPerformance.performance}></PerformanceDetailTable>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default UserPerformance;
