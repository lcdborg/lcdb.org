import { Card, CardContent, Grid } from "@mui/material";
import Head from "next/head";
import { graphql } from "src/utils/graphql";
import Details from "src/views/performance/details";
import performanceDate from "src/views/performance/performance-date";

export async function getServerSideProps(context: any) {
  const query = `
    query Performance($id: Int!) {
      performance(id: $id) {
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
        artist {
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
      }
    }
    `;

  const id = Number(context.query.id);
  const graphqlResult = await graphql(query, {id}, 'Performance');

  return {
    props: {
      graphql: graphqlResult,
    },
  }
}

function Performance(props: any) {
  return (
    <>
      <Head>
        <title>
          LCDB: Performance
          &nbsp;
          {props.graphql.data.performance.artist.name}
          &nbsp;
          {performanceDate(props.graphql.data.performance)}
        </title>
      </Head>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Card sx={{ position: 'relative' }}>
            <CardContent>
              <Details performance={props.graphql.data.performance}></Details>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
  }

  export default Performance;
